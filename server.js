/* server.js - Node.js and Express.js routing
# Angular takes over the front-end */

'use strict';

/* requires */
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportSpotify = require('passport-spotify');
var mongoose = require('mongoose');

/* define var app for Express */
var app = express();

/* Passport*/
//require('server/includes/spotify.password');

/* Spotify web auth */
require('server/includes/spotify.webauth.js');

/* Listen to */
app.listen(process.env.port || 3000, function () {
	console.log('SPX app listening op port 3000');
});

/* define routes */
app.use(express.static(__dirname + '/'));

/* Mongoose connection */
//mongoose.connect('mongodb://localhost/spxdb');

/* Passport and db connections */
//require('./includes/passport.js');
//require('./datasets/db.js');

/* set up the express application */
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());

/* Passport config */
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/spotify',
	passport.authenticate('spotify'),
	function (req, res) {
		//...
	});

app.get('/auth/spotify/callback',
	passport.authenticate('spotify', { failureRedirect: '/login'}),
	function (req, res) {
		res.redirect('/user/dashboard');
	});