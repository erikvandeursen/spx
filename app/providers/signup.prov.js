/* Signup prov - factory for signing up new user */

(function () {
	'use strict'; 

	angular.module('spx')
		.factory('signUpFactory', ['$q', '$timeout', '$http',
			function ($q, $timout, $http) {

				/* Create user variable */
				var user = null;

				/* return available funciton for use in the controllers */
				return ({
					register: register
				});

				function signUp(username, password) {
					/* create a new instance of deferred */
					var deferred = $q.defer();

					/* send a post request to the server */
					$http.post('/signup',
						{
						 	username: username,
						 	password: password
						}
					)

					/* handle success */
					.success(function (data, status) {
						if (status === 200 && data.status) {
							deferred.resolve();
						} else {
							deferred.reject();
						}
					})

					/* handle error */
					.error(function (data, status){
						deferred.reject();
					});

				/* return promise object */
				return deferred.promise;

				}

			}]);

		//return factory;
	}

)();
