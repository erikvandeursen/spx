/* server.js - Node.js and Express.js routing
# Angular takes over the front-end */

'use strict';

/* requires */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');

/* define var app for Express */
var app = express();

/* Mongoose connection */
//mongoose.connect('mongodb://localhost:27017/spxdb');

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
app.use(express.static(__dirname + '/'));

/* define controllers as dependencies */
var authController = require('./server/controllers/auth.controller.js');
var playlistController = require('./server/controllers/playlistview.controller.js');

/* routing controllers */
app.get('/auth_login', authController.authLogin);
app.get('/callback', authController.handleCallback);
app.get('/#/user/dashboard', authController.getUserInfo); // /#/user/user_settings
app.get('/playlists', playlistController.getPlaylists);

/* Listen to */
app.listen(process.env.port || 3000, function () {
	console.log('SPX app listening op port 3000');
});
