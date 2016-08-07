/* server.js - Node.js and Express.js routing
# Angular takes over the front-end */

'use strict';

/* requires */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

/* define routes */

app.use(express.static('public'));

/* app.get */
app.get('/', function (req, res) {
	console.log('Redirect to /home');
	return res.redirect('/home');
});

app.get('/dashboard', function (req, res) {
	// ...
});

app.post('/login', function (req, res) {
	var userdata = { username: req.body.username, password: req.body.password };
	res.status(200).end();
});

app.get('/loginout', function (req, res) {
	req.logout();
	res.redirect('/');
});

/* Listen to */
app.listen(port.process.env || 3000, function () {
	console.log('app listening op port 3000');
});

module.exports = express;