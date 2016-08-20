/* UserInfo prov - controller for handling user info from API calls */

	'use strict';

	angular.module('spxPlaylist', ['ngCookies'])
		.controller('playlistController', ['$scope', '$http', '$cookies', function playlistController ($scope, $http, $cookies) {
			
			/* controller used for getting user info out of the Spotify API via factory */

			var res = [];
			var	getAccessToken = $cookies.get('spotifyAuthToken');
			var	req = {	method: 'GET',
						headers: {
							'Authorization': 'Bearer ' + getAccessToken
						},
						cache: true
					}

			/* values for sorting */
			$scope.sortType = 'name';
			$scope.sortReverse = false;
			$scope.searchPlaylists   = '';

			/* get all my playlists to render /me/playlist/all endpoint */
			var getPlaylistAll = function () {
				/* define variabels to config http get request from /me/playlists endpoint */
				
				var	url = 'https://api.spotify.com/v1/me/playlists';
				
				console.log(getAccessToken);

				/* make request */
				$http.get(url, req)		
				.then(function successCallback(res) {
						$scope.playlists = res;
		 			}, function errorCallback(err, status) {
		 				var errorMsg = err;
						var status = status;
				    	console.log('Error: ' + err, status);
				    })
			}
			getPlaylistAll();

			/* get all featured playlists to render /me/playlist/all endpoint */
			var getPlaylistFeatured = function () {
				/* define variabels to config http get request from /browse/featured-playlists endpoint */
				var	url = 'https://api.spotify.com/v1/browse/featured-playlists';

				/* make request */
				$http.get(url, req)		
				.then(function successCallback(res) {
						var ftplaylist = 'featured-playlists';
						$scope.ftplaylist = res;
		 			}, function errorCallback(err, status) {
		 				var errorMsg = err;
						var status = status;
				    	console.log('Error: ' + err, status);
				    })
			}
			getPlaylistFeatured();

			/* get all tracks in a playlisy to render /me/playlist/:id endpoint */
			var getPlaylistOnId = function (id) {
				/* define variabels to config http get request from /browse/featured-playlists endpoint */
				var	url = 'https://api.spotify.com/v1/browse/featured-playlists';

				/* make request */
				$http.get(url, req)		
				.then(function successCallback(res) {
						var ftplaylist = 'featured-playlists';
						$scope.ftplaylist = res;
						console.log($scope.ftplaylist.data.playlists.items[0]);
		 			}, function errorCallback(err, status) {
		 				var errorMsg = err;
						var status = status;
				    	console.log('Error: ' + err, status);
				    })
			}
			getPlaylistFeatured();
	}]);