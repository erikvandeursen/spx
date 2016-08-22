'use strict';

angular.module('spx')
	.controller('trackController', ['$scope', '$http', '$cookies', '$location', function trackController ($scope, $http, $cookies, $location) {
		
		/* controller used for getting user info out of the Spotify API via factory */

		var res = [],
			getAccessToken = $cookies.get('spotifyAuthToken'),
			userId = localStorage.getItem('spotifyAccountId'),
			playlistId = localStorage.getItem('playlistId'),
			playlistOwnerId = localStorage.getItem('playlistOwnerId');

		console.log('playlistId: ' + playlistId, ', playlistOwnerId: ' + playlistOwnerId);

		/* values for sorting */
		$scope.sortType = 'name';
		$scope.sortReverse = false;
		$scope.searchTracks   = '';

		/* scope value for back button */
		$scope.goback = function (path) {
			$location.path(path);
		}

		/* get all my playlists to render /me/playlist/:id endpoint */
		var getTracks = function () {
			/* define variabels to config http get request from /users/{user_id}/playlists/{playlist_id}/tracks */
			var	url = 'https://api.spotify.com/v1/users/' + playlistOwnerId + '/playlists/' + playlistId +'/tracks',
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
					$scope.tracks = res;
					//console.log($scope.tracks.data.items[0]);
					var id = [];
					for (var i = 0; i < res.data.items.length; i++) {
						id.push(res.data.items[i].track.id);
					}
					console.log('var id: ' + id);
					getTrackAudioFeats(id);
	 			}, function errorCallback(err, status) {
	 				var errorMsg = err;
					var status = status;
			    	console.log('Error: ' + err, status);
			    })
		}
		getTracks();

		/* get audio features */
		var getTrackAudioFeats = function (id) {
			/* define variabels to config http get request /audio-features/{id} */
			var getid = id;
			console.log('parameter: ' + getid)
			//var joinedids = getid.join(),
			var	url = 'https://api.spotify.com/v1/audio-features/?ids=' + getid,
				req = {	method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + getAccessToken
					},
					cache: true
				}
				console.log('id in getTrackAudioFeats: ' + id);

				/* make request */
				$http.get(url, req)		
				.then(function successCallback(res) {
						$scope.audiofeats = res;
						//console.log($scope.audiofeats);
		 			}, function errorCallback(err, status) {
		 				var errorMsg = err;
						var status = status;
				    	console.log('Error: ' + err, status);
				    })
		}
}]);