/* API calls for playlist operations, hook into server.js */

var request = require('request');

module.exports.getPlaylists = function (req, res) {

	/* request user info */
	var playlistOptions = {
		url: 'https://api.spotify.com/v1/users/' + clientName + '/playlists',
		headers: { 'Authorization': 'Bearer ' + access_token },
		json: true
	};

	request.post(authOptions, function(error, response, body) {
		if (!error && response.statusCode == 200) {

			request.get(playlistOptions, function(error, response, body) {
			 	console.log(body);

			});
	}});
}