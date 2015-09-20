var mysql = require('mysql');
var io = require('socket.io');

var connection = mysql.createConnection(require('./dbconnection.js'));

//Muutetaan tietokannasta käyttäjän is_online arvo nollaksi. 0 = offline 1 = online
exports.LogoutUser = function(username, callback){
	connection.query('update login set is_online=0 where login="' + username + '";', function(err){
		if (err)
		{
			console.log("Error: "+err);
			callback(err);
		}
		else
		{
			callback(err);
		}
	});
};

