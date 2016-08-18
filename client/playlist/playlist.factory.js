/* Playlist prov - factory for handling playlists from API calls */

(function () {
	'use strict';

	angular.module('spxPlaylist', [])
		.factory('playlistFactory', ['$http', '$q', '$cookies', function ($http, $q, $cookies) {

	var factory = {};

		factory.getPlaylists = function () {

			function httpPromise() {

				/* define variabels to config http get request */
				var deferred = $q.defer(),
					getAccessToken = $cookies.get('spotifyAuthToken'),
					url = 'https://api.spotify.com/v1/users/{user_id}/playlists',
					req = {	method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + getAccessToken
					},
					cache: true
					}

				/* make request */
				$http.get(url, req)
					.then(function successCallback(res) {
						deferred.resolve(data.results);
		 			}, function errorCallback(err) {
				    	deferred.reject();
		  			});
				return deferred.promise;
			}
			return httpPromise();
		}
		return factory;
	}]);
})