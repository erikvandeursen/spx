/* user controller */

var request = require('request');
var mongoose = require('mongoose');

module.exports.showUserInfo = function (req, res) {
	/* send controller and factory to /me */
	
}

/* request user info */
module.exports.getUserData = function (req, res) {

	/* get token */
	var access_token = req.cookies.spotifyAuthToken;

	/* check if token is set */
	if (access_token) {
		
		/* define options to send to server */
		var options = {
		  url: 'https://api.spotify.com/v1/me', // pass endpoint via function parameter
		  headers: { 'Authorization': 'Bearer ' + access_token },
		  json: true
		};
	};
	
	/* send get to server and return data in body */
	request.get(options, function(error, response, body) {
		console.log(body);
		console.log(access_token);
	});
};

/* request Spotify data */
module.exports.getSpotifyData = function (req, res) {

	/* request user info */
	if (!error && response.statusCode == 200) {

		var access_token = body.access_token,
		    refresh_token = body.refresh_token;

		var options = {
		  url: 'https://api.spotify.com/v1/me',
		  headers: { 'Authorization': 'Bearer ' + access_token },
		  json: true
		};

		request.get(options, function(error, response, body) {
			console.log(body);
			console.log(access_token);
		});
	}
};