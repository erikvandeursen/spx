'use strict';

angular.module('spxTracks', ['ngCookies'])
	.controller('trackController', ['$scope', '$http', '$cookies', function trackController ($scope, $http, $cookies) {
		
		/* controller used for getting user info out of the Spotify API via factory */

		var res = [];
		var	getAccessToken = $cookies.get('spotifyAuthToken');

		/* values for sorting */
		$scope.sortType = 'name';
		$scope.sortReverse = false;
		$scope.searchTracks   = '';

		/* get all my playlists to render /me/playlist/:id endpoint */
		var getTracks = function () {
			/* define variabels to config http get request from /users/{user_id}/playlists/{playlist_id}/tracks */
			var	userId = 'erikvandeursen',//client_name, // uit JSON halen?
				playlistId = '13MmCXQKL0tKObVYurYozZ', // header ophalen om id te bepalen
				url = 'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId +'/tracks',
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
					var idarray = [];
					for (var i = 0; i < res.data.items.length; i++) {
						idarray.push(res.data.items[i].track.id);
					}
					console.log('var id: ' + idarray);
					var id = idarray;
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