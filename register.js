var mysql = require('mysql');

var connection = mysql.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: 'test1234',
	database: 'vsklogin'
});

exports.RegisterPlayer = function(username, password, callback) {
	CheckIfExists(username, function(err) {
		if (err) {
			console.log('ERROR: ' + err);
			callback(err);
			return;
		} else {
			connection.query('insert into login(login, password) values("'+ username + '","'+ password + '");', function(err){
				callback(err);
			});
		};
	});
};


 function CheckIfExists(username, callback) {
	GetAllPlayers( function(err, players) {
		if (err) {
			callback(err);
			return;
		} else {
			for (i = 0; i < players.length; i++) {
				if (players[i].username == username) {
					err = "Username already exists";
				};
			};
			callback(err);
		};
	});
};

function GetAllPlayers(callback) {
	connection.query('select login from login', function(err, rows){
		callback(err, rows);
	});
};
