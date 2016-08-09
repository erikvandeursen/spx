/* Spotify web auth, structure into server.js and this file (require) */

var express = require('express');
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

/* get client_id, client_secret and redirect_uri from seperate json */
//var spotifyAuth = require('_auth.json');
//console.log(spotifyAuth);

/* define client_id, client_secret and redirect_uri based on the spotifyAuth array */
var clientId = '';
var clientSecret = '';
var redirectUri = 'http://localhost:3000/callback';

/* Generate a random string containing numbers and letters */
var generateRandomString = function (length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

var stateKey = 'spotify_auth_state';

var app = express() // delete line when moving to server.js

/* Static page */
app.use(express.static(__dirname + '/')) // delete line when moving to server.js
	.use(cookieParser);

/* Login route */
app.get('/auth_login', function (req, res) {
	var state = generateRandomString(16);
	res.cookie(stateKey, state);
	
	var scope = 'user-read-private user-read-email';
	res.redirect('https://accounts.spotify.com/authorize?' + 
		queryString.stringify({
			response_type: 	"code",
			client_id: 		CLIENT_ID,
			scope: 			scope,
			redirect_uri: 	REDIRECT_URI,
			state: 			state     
		}));
});

/* Callback route */
app.get('/callback', function (req, res) {

	var code = req.query.code || null;
	var state = req.query.state || null;
	var storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect('/#' + 
			querystring.stringify({	
				error: 'state_mismatch'
			}));
	} else {
		res.clearCookie(stateKey);
		var authOptions = {
			url: "https://accounts.spotify.com/api/token",
			form: {
				code: code,
				redirect_uri: redirect_uri,
				grant_type: 'authorization_code'
			},
			headers: {
				'Authorization' :'Basic ' + (new Buffer (client_id + ':' + client_secret).toString('base64')) 
			},
			json: true
		};
	}

	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {

			var access_token = body.access_token,
			refresh_token = body.refresh_token;

			var options = {
				url: 		"https://api.spotify.com/v1/me",
				headers: 	{
								'Authorization' : 'Bearer ' + access_token
							},
				json: true
			}

			/* use the access token to access the Spotify Web API */
			request.get(options, function (error, response, body) {
				console.log(body);
			});

			/* We can also pass the token to the browser to maken requests from there */
			res.redirect('/#' + 
				querystring.stringify({
					access_token: access_token,
					refresh_token: refresh_token
				}));
		} else {
			res.redirect('/' + 
				querystring.stringify({
					access_token: access_token,
					error: 'invalid_token'
				}));
		}
	});	
});

/* Route for refresh token */
app.get('/refresh_token', function (req, res) {

	/* requesting access token from refresh token */
	var refresh_token = req.query.refresh_token;
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

// listen: remove on production
console.log("SPX app (Spotify web auth) listening on port 3000");
app.listen(3000);