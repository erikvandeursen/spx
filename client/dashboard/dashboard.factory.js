/* profile-controller.js - profile functionality */

'use strict';

angular.module('spxDashboard', ['ui.router', 'ngCookies'])
	.factory('dashboardFactory', ['$http', '$q', '$cookies', function ($http, $q, $cookies) { 

	var factory = {};
			
		factory.getUserInfo = function () {

			factory.httpPromise = function () {

				/* define variabels to config http get request */
				var deferred = $q.defer(),
					getAccessToken = $cookies.get('spotifyAuthToken'),
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
						deferred.resolve(data.results);
						console.log(res);
		 			}, function errorCallback(err) {
				    	deferred.reject();
				    	console.log(err);
		  			});
				return deferred.promise;
			}
			return httpPromise();
		}
	return factory;

	}]);