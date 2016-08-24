/* auth controller - Authorization Code Flow */

/* dependencies */
var request = require('request');
var queryString = require('querystring');
var express = require('express');
var cookieParser = require('cookie-parser');
var authprovider = require('./auth.prov.js');
var userauth = require('../includes/userauth.json');
var configauth = require('../includes/configauth.json');

/* generate random string to use for state call */
function generateRandomNumber (length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (var i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	};

/* API credentials to use as parameters for authLogin */
var clientId = userauth['client_id'],
	clientName = userauth['client_name'],
	clientSecret = configauth['client_secret'],
	redirectUri = configauth['redirect_uri'],
	scope = configauth['scopes'],
	state = generateRandomNumber(16);

/* make a connection to the authentication server and request a activation code */
module.exports.authLogin = function (req, res) {

	/* build URL to request token and redirect user to Spotify authorization server */
	res.redirect('https://accounts.spotify.com/authorize/?' + 
		queryString.stringify({
			response_type: 	"code",
			client_id: 		clientId,
			scope: 			scope,
			redirect_uri: 	redirectUri,
			state: 			state     
		}));
};

/* Handling callback and get token + refresh token from API */
module.exports.handleAuthCallback = function (req, res) {

	/* declare code and state to send back for token request */
	var code  = req.query.code || null;

	/* define parameters to pass to request */
	var tokenRequestParams = {
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
		};

	/* make request to token server when browser lands on the callback */
	if (res.status(200) && code !== null) {
		request.post(tokenRequestParams, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token,
	            	refresh_token = body.refresh_token,
	            	token_type = body.token_type,
	            	scope = body.scope,
	            	expires_in = body.expires_in;
				
				// console
	            console.log(access_token + '\n' + refresh_token + '\n' + token_type + '\n' + scope + '\n' + expires_in + '\n');

			    /* store token in cookie */
			    var setstoken = res.cookie('spotifyAuthToken', access_token, { expires: new Date(Date.now() + 900000)});
			    var setsrtoken = res.cookie('spotifyAuthRefreshToken', refresh_token, { expires: new Date(Date.now() + 900000)});
			    
			    /* if tokens are set redirect or throw error */
			    if (setstoken && setsrtoken) {
			    	res.redirect('me') // /#/user/dashboard/?' +
					/*queryString.stringify({
						access_token: access_token,
						refresh_token: refresh_token
					}));  */
			    } else {
			    	/* error thrown: token couldn't be set */
			    	res.redirect('/error' + queryString.stringify({
        				error: 'token_set_wrong'
      				}));
			    }

			/* error thrown: problem found while instantiating token */
			} else {
				res.redirect('/error' + queryString.stringify({
        			error: 'token_instantiate'
      			}));
      		}
      	});

	/* error thrown: HTTP status not 200 or wrong code */
	} else {
		res.redirect('/error' + queryString.stringify({
        	error: 'status_or_code_not_set'
    	}));
	}
}

/* get a refresh token in case the original token expires (+ 1h) */
module.exports.getRefreshToken = function (req, res) {
	//var access_token;
	res.cookie('spotifyAuthToken', access_token);

	/* requesting access token from refresh token */
	var refresh_token = req.query.refresh_token;
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: { 'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64')) },
		form: {
	  		grant_type: 'refresh_token',
	  		refresh_token: refresh_token
		},
		json: true
	};

	/* get new access token */
	request.post(authOptions, function(error, response, body) {
		console.log(response + 'body: ' + body);
		if (!error && response.statusCode === 200) {
			var access_token = body.access_token;
			res.send({
				'access_token': access_token
			});
			res.redirect('/#/me')
		} else {
			console.log('Error encountered while request refresh token: ' + error);
		}
	});
};