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
//mongoose.connect('mongodb://localhost/spxdb');

/* set up the express application */
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());

/* Passport config */
//app.use(passport.initialize());
//app.use(passport.session());

/* Passport and db connections */
//require('./includes/passport.js');
//require('./datasets/db.js');

/* Spotify web API node config */
// require(''); // external files

/* Static page */
app.use(express.static(__dirname + '/'));

/* Authentication config */
var state = 'aISD083q489fjef';

var clientId = 'b33930b4b1704582a2dddef0f68e426e',
  clientName = 'erikvandeursen',
	clientSecret = '',
	redirectUri = 'http://localhost:3000/callback',
	scopes = ['playlist-read-private playlist-modify-public playlist-modify-private user-read-private user-read-birthdate user-read-email'],
	state = state;
 
var spotifyApi = new SpotifyWebApi({
	redirectUri: redirectUri,
	clientId: clientId
});

/* The application requests authorization */
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
console.log(authorizeURL);

/* Get authorization code and set scope */
app.get('/auth_login', function(req, res) {
res.redirect('https://accounts.spotify.com/authorize' + 
  '?response_type=code' +
  '&client_id=' + clientId +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirectUri));
});

/* get callback */
app.get('/callback', function (req, res, next) {
  var code  = req.query.code; // Read the authorization code from the query parameters
  var state = req.query.state; // (Optional) Read the state from the query parameter
  console.log(code);

  if (state !== null && code !== null) {
  	var authOptions = {
  		url: 'https://accounts.spotify.com/api/token',
      	form: {
        	code: code,
        	redirect_uri: redirectUri,
        	grant_type: 'authorization_code'
      	},
      	headers: {
        	'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      	},
		json: true
  	}

  	request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode == 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        var playlistOptions = {
          url: 'https://api.spotify.com/v1/users/' + clientName + '/playlists',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        request.get(playlistOptions, function(error, response, body) {
          console.log(body);
        });

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
          console.log(access_token);

        //redirect to dashboard
        res.redirect(200, '/#/user/dashboard');


        });
    }});
  }
});


app.get('/#/user/user_settings', function (res, req) {
	var oauthPlaceholder = document.getElementById('#getspotifycurrentoken');
	oauthPlaceholder.innerHTML = 'gezien'; //access_token;
});

/* Listen to */
app.listen(process.env.port || 3000, function () {
	console.log('SPX app listening op port 3000');
});
