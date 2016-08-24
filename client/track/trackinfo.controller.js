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
							$scope.audiofeats = res;
							console.log(res);
							console.log(res.data);
							console.log(res.data.items);
							$scope.data = [
				            {
				                key: "Audio Features",
				                values: [
				                    {
				                        "label" : "Dancebility" ,
				                        "value" : res.data.audio_features[0].danceability
				                    } ,
				                    {
				                        "label" : "Energy" ,
				                        "value" : res.data.audio_features[0].energy
				                    } ,
				                    {
				                        "label" : "Loudness" ,
				                        "value" : res.data.audio_features[0].loudness
				                    } ,
				                    {
				                        "label" : "Speechiness" ,
				                        "value" : res.data.audio_features[0].speechiness
				                    } ,
				                    {
				                        "label" : "Acousticness" ,
				                        "value" : res.data.audio_features[0].acousticness
				                    } ,
				                    {
				                        "label" : "Liveness" ,
				                        "value" : res.data.audio_features[0].liveness
				                    } ,
				                    {
				                        "label" : "Valence" ,
				                        "value" : res.data.audio_features[0].valence
				                    } ,
				                    {
				                        "label" : "Tempo" ,
				                        "value" : res.data.audio_features[0].tempo
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
		getTrackInfo();
}]);