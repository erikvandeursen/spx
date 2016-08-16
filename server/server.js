/* server.js - Node.js and Express.js routing
# Angular takes over the front-end */

'use strict';

/* requires */
var express = require('express');
var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;

/* define var app for Express */
var app = express();

/* define var User for login and registration purposes */
var User = require('./datasets/users.js');

/* Mongoose connection */
mongoose.connect('mongodb://localhost:27017/spxdb');

/* set up the bodyParser module  */
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());

/* Passport config */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Static page (path) set to authenticate or default to root when page not found */
app.use(express.static(path.join(__dirname, '../client'))).use(cookieParser());
app.get('/authenticate', function (req, res) {
	res.sendFile(path.join(__dirname, '../client', index.html))
});
app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../client/public', error.html))
});

/* define controllers as dependencies */
var authController = require('./auth/auth.controller.js');
var dashboardController = require('./dashboard/dashboard.controller.js')
var errorController = require('./error/error.controller.js');
var playlistController = require('./playlist/playlist.controller.js');
var loginController = require('./login/login.controller.js');
var signUpController = require('./signup/signup.controller.js');

/* endpoint controllers */
app.get('/authenticate');
app.get('/token_request', authController.authLogin);
app.get('/token_callback', authController.handleAuthCallback);
app.get('/token_refresh', authController.getRefreshToken);
app.get('/user/me', function (req, res) {
		res.send('../client/dashboard.html')}); // get full screen dashboard.html to override index.html
app.get('/user/me/user', dashboardController.getUserData);
app.get('/user/me/playlist', playlistController.getPlaylist);
app.get('/user/me/playlists_all', playlistController.getPlaylistAll);
app.get('/user/me/playlists_new', playlistController.createPlaylist);
app.post('/login', loginController.logIn);
app.get('/logout', loginController.logOut);
app.post('/signup', signUpController.signUp);
app.get('/error', errorController.errorHandling);

/* Error handlers */
app.use (function (req, res, next) {
	var err = new Error('Not found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res) {
	res.status(err.status || 500);
	res.end(JSON.stringify({
		message: err.message,
		error: {}
	}));
});

/* Listen to */
app.listen(process.env.port || 3000, function () {
	console.log('SPX app listening op port 3000');
});
