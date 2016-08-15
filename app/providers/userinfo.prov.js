/* UserInfo prov - factory for handling user info from API calls */

(function () {
	'use strict';

	angular.module('spx.usersettings')
		.factory('userInfoFactory', ['$http', '$q', '$cookies', function ($http, $q, $cookies) {

	var factory = {};

		factory.getUserInfo = function () {

			function httpPromise() {

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
		 			}, function errorCallback(err) {
				    	deferred.reject();
		  			});
				return deferred.promise;
			}
			return httpPromise();
		}
		return factory;
	}]);
})