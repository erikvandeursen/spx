/* all controls and handling for tracks in selected playlist, including visuals */
'use strict';

angular.module('spx')
	.controller('trackController', ['$scope', '$http', '$cookies', '$location', function trackController ($scope, $http, $cookies, $location) {
		
		/* controller used for getting user info out of the Spotify API via factory */

		var res = [],
			getAccessToken = $cookies.get('spotifyAuthToken'),
			playlistId = localStorage.getItem('playlistId'),
			playlistOwnerId = localStorage.getItem('playlistOwnerId');

		/* values for sorting */
		$scope.sortType = 'name';
		$scope.sortReverse = false;
		$scope.searchTracks   = '';

		/* load tracks and set item in localStorage to identify track id's */
		$scope.loadtrack = function (path) {
			$location.path(path);
			localStorage.setItem('trackid', path);
		}

		/* scope value for back button */
		$scope.goback = function (path) {
			$location.path(path);
		}

		/* angular nvd3 visual */
		$scope.optionsbar = {
	            chart: {
	                type: 'discreteBarChart',
	                height: 450,
	                margin : {
	                    top: 20,
	                    right: 20,
	                    bottom: 50,
	                    left: 55
	                },
	                x: function(d){return d.label;},
	                y: function(d){return d.value;},
	                showValues: true,
	                valueFormat: function(d){
	                    return d3.format(',.4f')(d);
	                },
	                duration: 500,
	                xAxis: {
	                    axisLabel: 'X Axis'
	                },
	                yAxis: {
	                    axisLabel: 'Y Axis',
	                    axisLabelDistance: -10
	                }
	            }
			};

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

			/* make request */
			$http.get(url, req)		
			.then(function successCallback(res) {
					$scope.tracks = res;
					var id = [];
					for (var i = 0; i < res.data.items.length; i++) {
						id.push(res.data.items[i].track.id);
					}
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
			//var joinedids = getid.join(),
			var	url = 'https://api.spotify.com/v1/audio-features/?ids=' + getid,
				req = {	method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + getAccessToken
					},
					cache: true
				}

				/* make request */
				$http.get(url, req)		
					.then(function successCallback(res) {
							$scope.audiofeats = res;
							var len = res.data.audio_features.length;
							var total = 0;

							for (var i = 0; i < len; i++) {
								var calcTotalDanceability = total += res.data.audio_features[i].danceability,
									calcAvgDanceability = total / 100;
								$scope.trackTotalDanceability = calcTotalDanceability;
							}
							for (var i = 0; i < len; i++) {
								var calcTotalEnergy = total += res.data.audio_features[i].energy,
									calcAvgEnergy = total / len;
								$scope.trackTotalEnergy = calcTotalEnergy;
							}
							for (var i = 0; i < len; i++) {
								var calcTotalLoudness = total += res.data.audio_features[i].loudness,
								calcAvgLoudness = total / len;
								$scope.trackTotalLoudness = calcTotalLoudness;
							} 
							for (var i = 0; i < len; i++) {
								var calcTotalSpeechiness = total += res.data.audio_features[i].speechiness,
								calcAvgSpeechiness = total / len;
								$scope.trackTotalSpeechiness = calcTotalSpeechiness;
							} 
							for (var i = 0; i < len; i++) {
								var calcTotalAcousticness = total += res.data.audio_features[i].acousticness,
								calcAvgAcousticness = total / len;
								$scope.trackTotalAcousticness = calcTotalAcousticness;
							} 
							for (var i = 0; i < len; i++) {
								var calcTotalLiveness = total += res.data.audio_features[i].liveness,
								calcAvgLiveness = total / len;
								$scope.trackTotalLiveness = calcTotalLiveness;
							} 
							for (var i = 0; i < len; i++) {
								var calcTotalValence = total += res.data.audio_features[i].valence,
								calcAvgValence = total / len;
								$scope.trackTotalValence = calcTotalValence;
							} 
							for (var i = 0; i < len; i++) {
								var calcTotalTempo = total += res.data.audio_features[i].tempo;
								var calcAvgTempo = total / len;
								$scope.trackTotalTempo = calcTotalTempo;
							} 

						$scope.data = [
				            {
				                key: "Audio Features",
				                values: [
				                    {
				                        "label" : "Dancebility" ,
				                        "value" : calcAvgDanceability
				                    } ,
				                    {
				                        "label" : "Energy" ,
				                        "value" : calcAvgEnergy
				                    } ,
				                    {
				                        "label" : "Loudness" ,
				                        "value" : calcAvgLoudness
				                    } ,
				                    {
				                        "label" : "Speechiness" ,
				                        "value" : calcAvgSpeechiness
				                    } ,
				                    {
				                        "label" : "Acousticness" ,
				                        "value" : calcAvgAcousticness
				                    } ,
				                    {
				                        "label" : "Liveness" ,
				                        "value" : calcAvgLiveness
				                    } ,
				                    {
				                        "label" : "Valence" ,
				                        "value" : calcAvgValence
				                    } ,
				                    {
				                        "label" : "Tempo" ,
				                        "value" : calcAvgTempo
				                    }
				                ]
				            }
				        ]

			 			}, function errorCallback(err, status) {
			 				var errorMsg = err;
							var status = status;
					    	console.log('Error: ' + err, status);
					    })
			}
}]);