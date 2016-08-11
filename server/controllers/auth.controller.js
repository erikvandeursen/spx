/* auth controller - Authorization flow */

/* dependencies */
var request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');
var authdata = require('../includes/_auth.json');

/* generate state as hash next to send with the activation code */
var generateRandomNumber = function (length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

/* API credentials */
var clientId = authdata['client_id'],
  	clientName = authdata['client_name'],
	clientSecret = authdata['client_secret'],
	redirectUri = authdata['redirect_uri'],
	scopes = authdata['scopes'],
	state = generateRandomNumber(16);

/* Authentication config */
module.exports.authLogin = function (req, res) {

	/* define spotifyAPI object wrapper to make first auth call */
	var spotifyApi = new SpotifyWebApi({
		redirectUri: redirectUri,
		clientId: clientId
	});

	res.redirect('https://accounts.spotify.com/authorize/' + 
		'?client_id=' + clientId +
		'&response_type=code' +
	  	'&redirect_uri=' + encodeURIComponent(redirectUri)) +
	  	(scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
	  	'&state=' + state;
} 

module.exports.handleCallback = function (req, res) {

	/* get callback and define request based on the callback */
	var code  = req.query.code;
	//var state = req.query.state;

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

		//redirect to dashboard
		res.redirect(200, '/#/user/dashboard');
	}
}

module.exports.getUserInfo = function () {

	/* request user info */
	if (!error && response.statusCode == 200) {

		var access_token = body.access_token,
		    refresh_token = body.refresh_token;

		var options = {
		  url: 'https://api.spotify.com/v1/me',
		  headers: { 'Authorization': 'Bearer ' + access_token },
		  json: true
		};

		// use the access token to access the Spotify Web API
		request.get(options, function(error, response, body) {
		  console.log(body);
		  console.log(access_token);
		});
	}
};