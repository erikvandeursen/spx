/* server.js - Node.js and Express.js routing
# Angular takes over the front-end */

'use strict';

/* requires */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('favicon');
var logger = require('logger');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var mongoose = require('mongoose');

//require('');
//require('');

var app = express();

// mongoose.connect('mongodb://localhost/todo');
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());

/* Listen to */
app.listen(process.env.port || 3000, function () {
	console.log('SPX app listening op port 3000');
});

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

app.get('register', function (req, res) {
	res.render('register', {});
});

/*
app.post('/register', function (req, res) {
	User.register(new User({
		username: req.body.username }),
		req.body.password, function (err, account) {
			if (err) {
				return res.status(500).json ({
					//...
				})
			}
		}
	}))
});
*/

module.exports = express;