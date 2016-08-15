/* server.js - Node.js and Express.js routing
# Angular takes over the front-end */

'use strict';

/* requires */
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;

/* define var app for Express */
var app = express();

/* define var User for login and registration purposes */
var User = require('./server/datasets/users.js');

/* Mongoose connection */
mongoose.connect('mongodb://localhost:27017/spxdb');

/* set up express session */
app.use(require('express-session')({
    secret: 'abc123',
    resave: false,
    saveUninitialized: false
}));

/* set up the bodyParser module  */
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());

/* Passport config */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Static page */
app.use(express.static(__dirname + '/')).use(cookieParser());

/* define controllers as dependencies */
var authController = require('./server/controllers/auth.controller.js');
var userController = require('./server/controllers/usersettings.controller.js')
var errorController = require('./server/controllers/error.controller.js');
var playlistController = require('./server/controllers/playlistview.controller.js');
var loginController = require('./server/controllers/login.controller.js');
var signUpController = require('./server/controllers/signup.controller.js');

/* routing controllers */
app.get('/auth_login', authController.authLogin);
app.get('/callback', authController.handleAuthCallback);
app.get('/error', errorController.errorHandling); // error handling
app.post('/login', loginController.logIn);
app.get('/logout', loginController.logOut);
app.post('/register', signUpController.signUp);
app.get('/refresh_token', authController.getRefreshToken);
//app.get('/user/dashboard', userController.showDashboard);
//app.get('/user/user_settings', userController.getUserData);
app.get('/user/spotify_settings', userController.getSpotifyData);
app.get('/user/playlists', playlistController.getPlaylists);

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
