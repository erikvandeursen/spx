/* profile-controller.js - profile functionality */

'use strict';

angular.module('spx')
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

			/* make request */
			$http.get(url, req)		
			.then(function successCallback(res) {
					//$scope.usercredentials = res;
					$scope.userdisplayname = res.data.display_name;
					$scope.useremail = res.data.email;
					$scope.userbirthdate = res.data.birthdate;
					$scope.useruri = res.data.uri;
					$scope.usercountry = res.data.country;
					$scope.userproduct = res.data.product;
					$scope.userfollowers = res.data.followers.total;
					$scope.userexternalurls = res.data.external_urls.spotify;
					$scope.userimg = res.data.images[0].url;
					localStorage.setItem('spotifyAccountId', res.data.id);
	 			}, function errorCallback(err, status) {
	 				var errorMsg = err;
					var status = status;
			    	console.log('Error: ' + err, status);
			    }
			)}
			getUser();
	}]);