/* login factory */

(function () {
	'use strict'; 

	angular.module('spx')
		.factory('loginFactory', loginFactory);

	/* inject $http and constants */
	loginFactory.$inject = ['$http']; // use globals as constants here.

	/* declare loginFactory */
	function loginFactory ($http, $q) {

	var factory = {};

	factory.sendMsg = "Factory gezien";

		/* declare functions */
		factory.showLoginMenu = function () {
			
			console.log('Login seen');
		}

		return factory;
	}

})();