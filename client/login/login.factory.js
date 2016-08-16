/* login factory */

(function () {
	'use strict'; 

	angular.module('spx.login', [])
		.factory('loginFactory', ['$q', '$timeout', '$http',
			function ($q, $timout, $http) {

				/* Create user variable */
				var user = null;

				/* return available funciton for use in the controllers */
				return ({
					isLoggedIn: isLoggedIn,
					getUserStatus: getUserStatus,
					login: logIn,
					logout: logOut
				});

				function isLoggedIn() {
					if (user) {
						return true
					} else {
						return false;
					}
				}

				function getUserStatus () {
					return $http.get('/user/status')

					/* handle success */
					.success(function (data) {
						if (data.status) {
							user = true;
						} else {
							user = false;
						}
					})

					/* handle errors */
					.error(function (data) {
						user = false;
					});
				}

				function logIn (username, password) {

					/* create new instance of deferred */
					var deferred = $q.defer();

					/* send a post request to the the server */
					$http.post('/login', 
					{
						username: username,
						password: password
					})

					/* handle success */
					.success(function (data, status) {
						if (status === 200 && data.status) {
							user = true;
							deferred.resolve();
						} else {
							user = false;
							deferred.reject();
						}
					})

					/* handle errors */
					.error(function (data) {
						user = false;
						deferred.reject();
					});

					/* return promise object */
					return deferred.promise;
				}

				function logOut () {

					/* create a new instance of deferred */
					var deferred = $q.defer();

					/* send a request to the server */
					$http.get('/logout')

					/*handle success */
					.success(function (data) {
						user = false;
						deferred.resolve();
					})

					/* handle errors */
					.error(function (data) {
						user = false;
						deferred.reject();
					});

					/* return promise object */
					return deferred.promise;
				}

			}]);

		//return factory;
	}

)();