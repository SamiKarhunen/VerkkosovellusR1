var mysql = require('mysql');
var io = require('socket.io');

var connection = mysql.createConnection(require('./dbconnection.js'));

//Muutetaan tietokannasta käyttäjän is_online arvo 1. 0 = offline, 1 = online
exports.LoginUser = function(username, password, callback) {
	connection.query('select * from login where login = "' + username + '";', function(err, rows, fields){
		for (var i in rows){
			if (password == rows[i].password){
				connection.query('update login set is_online=1 where login="' + username + '";');
				callback(err);
			}
			//Jos password ei ole sama kuin tietokannassa, annetaan virheilmoitus
			else if (password != rows[i].password){
				err = "Wrong username or password.";
				callback(err);
			}
			else{
				console.log("Error: " + err);
				callback(err);
			}
		};
	});
};
	
