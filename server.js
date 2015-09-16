var express = require('express');
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql');
// Uusi register-moduuli
var register = require('./register.js');

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

http.listen(3000, function(){
	console.log("Listening on http://127.0.0.1:3000");
});

