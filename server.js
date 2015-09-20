var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

var connection = mysql.createConnection(require('./functions/dbconnection.js'));

var register = require('./functions/register.js');
var login = require('./functions/login.js');
var logout = require('./functions/logout.js');

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
			res.send("Logged out");
		};
	});
});

//Lista onlinekäyttäjistä
var userlist = [];

io.on('connection', function(socket){
	console.log('Client connected');
		
	socket.on('disconnect', function(){
		console.log('Client disconnected');
	});

	socket.emit('info', {info: 'you have connected to matopelipalvelin'});
	
	socket.on('message', function(data){
		console.log(data);
	});	
	
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
});

http.listen(3000, function(){
	console.log("Listening on http://127.0.0.1:3000");
});

