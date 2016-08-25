/* all controls and handling for tracks in selected playlist, including visuals */
'use strict';

angular.module('spx')
	.controller('trackController', ['$scope', '$http', '$cookies', '$location', function trackController ($scope, $http, $cookies, $location) {
		
		/* controller used for getting user info out of the Spotify API via factory */

		var res = [],
			getAccessToken = $cookies.get('spotifyAuthToken'),
			playlistId = localStorage.getItem('playlistId'),
			playlistOwnerId = localStorage.getItem('playlistOwnerId'),
			playlistTrackAmount = localStorage.getItem('playlistTrackAmount');

		/* values for sorting */
		$scope.sortType = 'name';
		$scope.sortReverse = false;
		$scope.searchTracks   = '';

		/* load tracks and set item in localStorage to identify track id's */
		$scope.loadtrack = function (path) {
			$location.path(path);
			localStorage.setItem('trackId', path);
		}

		/* display total of tracks found in the playlist */
		$scope.trackTotalAmount = playlistTrackAmount;

		/* scope value for back button */
		$scope.goback = function (path) {
			$location.path(path);
		}

		/* angular nvd3 visual */
		$scope.optionsbar = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                width: 600,
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
                    axisLabel: 'Spotify Audio features'
                },
                yAxis: {
                    axisLabel: 'Values',
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
					var len = res.data.items.length;
					for (var i = 0; i < res.data.items.length; i++) {
						id.push(res.data.items[i].track.id);
						$scope.calcTotalAmount
					}

					/* calculate total duration based on all tracks */
					for (var i = 0; i < playlistTrackAmount; i++) {
						var total = 0
						var calcTotalDuration = total += res.data.items[i].track.duration_ms;
						$scope.trackTotalDuration = calcTotalDuration;
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

							for (var i = 0; i < len; i++) {
								var totalDanceability = 0;
								var calcTotalDanceability = totalDanceability += res.data.audio_features[i].danceability,
									calcAvgDanceability = totalDanceability / 100;
							}
							for (var j = 0; j < len; j++) {
								var totalEnergy = 0;
								var calcTotalEnergy = totalEnergy += res.data.audio_features[j].energy,
									calcAvgEnergy = totalEnergy / len;
							}
							for (var k = 0; k < len; k++) {
								var totalSpeechiness = 0;
								var calcTotalSpeechiness = totalSpeechiness += res.data.audio_features[k].speechiness,
								calcAvgSpeechiness = totalSpeechiness / len;
							} 
							for (var l = 0; l < len; l++) {
								var totalAcousticness = 0;
								var calcTotalAcousticness = totalAcousticness += res.data.audio_features[l].acousticness,
								calcAvgAcousticness = totalAcousticness / len;
							} 
							for (var m = 0; m < len; m++) {
								var totalLiveness = 0;
								var calcTotalLiveness = totalLiveness += res.data.audio_features[m].liveness,
								calcAvgLiveness = totalLiveness / len;
							} 
							for (var n = 0; n < len; n++) {
								var totalValence = 0;
								var calcTotalValence = totalValence += res.data.audio_features[n].valence,
								calcAvgValence = totalValence / len;
							}
							for (var o = 0; o < len; o++) {
								var total = 0;
								var calcTotalTempo = total += res.data.audio_features[o].tempo,
								calcAvgTempo = Math.round(total / len);
								$scope.trackAvgTempo = calcAvgTempo;
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