var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

var connection = mysql.createConnection(require('./functions/dbconnection.js'));

var register = require('./functions/register.js');
var login = require('./functions/login.js');
var logout = require('./functions/logout.js');
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.use(express.static('public'));

app.get('/register', function(req, res) {
	var username = req.query.username;
	var password = req.query.password;
	register.RegisterPlayer(username, password, function(err) {
		if (err) {
			res.send(err.toString());
		} else {
			res.send('You have been registered.');
		};
	});
});
app.get('/login', function(req, res) {
	var username = req.query.username;
	var password = req.query.password;
	login.LoginUser(username, password, function(err) {
		if (err) {
			res.send(err.toString());
		} else {
			
			res.send("Login successful!");
			
		};
	});
});

app.get('/logout', function(req,res){
	var username= req.query.username;
	logout.LogoutUser(username, function (err){
		if(err)
		{
			res.send(err.toString());
		}
		else
		{
			res.send("Logged out.");
		};
	});
});

app.get('/', function(req, res){
  res.sendFile(__dirname/ + '/public/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(user,msg){
    io.emit('chat message',user, msg);
  });
});

//Lista onlinekäyttäjistä
var userlist = [];
var scorelist = [];

io.on('connection', function(socket){
	socket.on('listUpdate', function(){
		//Työnnetään userlistiin käyttäjät jotka ovat online/joiden is_online arvo on 1
		connection.query("select login from login where is_online=1;", function(err,rows,fields){
			userlist = [];
			for(var i in rows)
			{
				userlist.push(rows[i].login);
			}
			//Listataan onlinekäyttäjät konsoliin ja ilmoitetaan clientille
			//eventistä userUpdate jonka parametrinä on lista onlinekäyttäjistä.
			console.log("Online users: " + userlist);
			io.sockets.emit('userUpdate', userlist);
		});
	});
	socket.on('scoreSave', function(user, score){
		connection.query('insert into highscore (login, score) values ("' + user + '", ' + score + ');');
		connection.query('select login, score from highscore order by score desc;', function (err,rows,fields){
			scorelist = [];
			
			for (var i in rows)
			{
				scorelist.push([rows[i].login, rows[i].score]);
			}
			io.sockets.emit('scoreUpdate', scorelist);
		});
	});
});




http.listen(port, function(){
	console.log("Listening on " + ip);
});

