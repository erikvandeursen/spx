/* all controls and handling for tracks in selected playlist, including visuals */
'use strict';

angular.module('spx')
	.controller('trackInfoController', ['$scope', '$http', '$cookies', '$location', function trackInfoController ($scope, $http, $cookies, $location) {
		
		/* controller used for getting user info out of the Spotify API via factory */

		var res = [],
			getAccessToken = $cookies.get('spotifyAuthToken'),
			trackId = localStorage.getItem('trackId');

		/* scope value for back button */
		$scope.goback = function (path) {
			$location.path(path);
		}

		/* angular nvd3 visual */
		$scope.optionsbar = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                width: 750,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 10
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
                },
                
            }
		};

		/* get audio features */
		var getTrackInfo = function () {
			/* define variabels to config http get request /audio-features/{id} */
			var	url = 'https://api.spotify.com/v1/tracks/' + trackId,
				req = {	method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + getAccessToken
					},
					cache: true
				}

				/* make request */
				$http.get(url, req)		
					.then(function successCallback(res) {
							$scope.trackinfoimg = res.data.album.images[0].url;
							$scope.trackinfoartist = res.data.artists[0].name;
							$scope.trackinfoname = res.data.name;
							$scope.trackinfoalbum = res.data.album.name;
							$scope.trackinfoduration = res.data.duration_ms;
							$scope.trackinfotrackno = res.data.track_number;
							$scope.trackinfospopularity = res.data.popularity;

							getTrackSpecAudioFeats();

			 			}, function errorCallback(err, status) {
			 				var errorMsg = err;
							var status = status;
					    	console.log('Error: ' + err, status);
					    })
		}
		getTrackInfo();

		var getTrackSpecAudioFeats = function (id) {
			/* define variabels to config http get request /audio-features/{id} */
			var getid = id;
			//var joinedids = getid.join(),
			var	url = 'https://api.spotify.com/v1/audio-features/' + trackId,
				req = {	method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + getAccessToken
					},
					cache: true
				}

				/* make request */
				$http.get(url, req)		
					.then(function successCallback(res) {
						console.log(res.data.danceability);
							$scope.data = [
				            {
				                key: "Audio Features",
				                values: [
				                    {
				                        "label" : "Dancebility" ,
				                        "value" : res.data.danceability
				                    } ,
				                    {
				                        "label" : "Energy" ,
				                        "value" : res.data.energy
				                    } ,
				                    {
				                        "label" : "Speechiness" ,
				                        "value" : res.data.speechiness
				                    } ,
				                    {
				                        "label" : "Acousticness" ,
				                        "value" : res.data.acousticness
				                    } ,
				                    {
				                        "label" : "Liveness" ,
				                        "value" : res.data.liveness
				                    } ,
				                    {
				                        "label" : "Valence" ,
				                        "value" : res.data.valence
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