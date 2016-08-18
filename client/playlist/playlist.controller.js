/* UserInfo prov - controller for handling user info from API calls */

'use strict';

angular.module('spxPlaylist', ['ngCookies'])
	.controller('playlistController', ['$scope', '$http', '$cookies', function playlistController ($scope, $http, $cookies) {
		
		/* controller used for getting user info out of the Spotify API via factory */

		var res = [];

		var getPlaylistAll = function () {
			/* define variabels to config http get request from /me endpoint */
			var	getAccessToken = $cookies.get('spotifyAuthToken'),
				userId = client_name;
				url = 'https://api.spotify.com/v1/me/playlists',
				req = {	method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + getAccessToken
					},
					cache: true
				}

			console.log(getAccessToken);

			/* make request */
			$http.get(url, req)		
			.then(function successCallback(res) {
					$scope.playlists = res.items;
					console.log('Console log krijgt binnen: ' + res.data);
	 			}, function errorCallback(err, status) {
	 				var errorMsg = err;
					var status = status;
			    	console.log('Error: ' + err, status);
			    }
			)}

			getPlaylistAll();
	}]);