/* server.js - Node.js and Express.js routing
# Angular takes over the front-end */

'use strict';

/* requires */
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
//var SpotifyWebApi = require('spotify-web-api-node');

/* define var app for Express */
var app = express();

/* Mongoose connection */
//mongoose.connect('mongodb://localhost:3000/spxdb');

/* set up the express application */
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());

/* Passport config */
//app.use(passport.initialize());
//app.use(passport.session());

/* Passport and db connections */
//require('./includes/passport.js');
//require('./datasets/db.js');

/* Static page */
app.use(express.static(__dirname + '/')).use(cookieParser());

/* define controllers as dependencies */
var authController = require('./server/controllers/auth.controller.js');
var userController = require('./server/controllers/usersettings.controller.js')
var errorController = require('./server/controllers/error.controller.js');
var playlistController = require('./server/controllers/playlistview.controller.js');

/* routing controllers */
app.get('/auth_login', authController.authLogin);
app.get('/callback', authController.handleAuthCallback);
app.get('/refresh_token', authController.getRefreshToken);
app.get('/user/dashboard', userController.showDashboard);
app.get('/user/user_settings', userController.getUserData);
app.get('/user/spotify_settings', userController.getSpotifyData);
app.get('/user/playlists', playlistController.getPlaylists);
app.get('/error', errorController.errorHandling); // error handling

/* Listen to */
app.listen(process.env.port || 3000, function () {
	console.log('SPX app listening op port 3000');
});
