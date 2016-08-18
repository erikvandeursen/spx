/* profile-controller.js - profile functionality */

'use strict';

angular.module('spxDashboard', ['ngCookies'])
	.controller('dashboardController', ['$scope', '$http', '$cookies', function dashboardController ($scope, $http, $cookies) {
		
		/* controller used for getting user info out of the Spotify API via factory */

		var res = [];

		var getUser = function () {
			/* define variabels to config http get request from /me endpoint */
			var	getAccessToken = $cookies.get('spotifyAuthToken'),
				url = 'https://api.spotify.com/v1/me',
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
					$scope.usercredentials = res;
					// userinfo wegschrijven in ../server/includes/userauth.json
					console.log('Console log krijgt binnen: ' + res);
	 			}, function errorCallback(err, status) {
	 				var errorMsg = err;
					var status = status;
			    	console.log('Error: ' + err, status);
			    }
			)}
			getUser();
	}]);