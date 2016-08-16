/* profile-controller.js - profile functionality */
(function () {
	'use strict'; 

	angular.module('spx')
		.controller('errorController', errorController);

	errorController.$inject = ['$http', '$routeProvider'];

	// include JSON with all errormessages: {errorUrl: errorMsg}

	function errorController ($http, $routeProvider) {
		/* check if received method is GET */
		if ($http.get === 'GET') {
			/* grab corrosponding errormessage from JSON */
			$http.get({
				method: 'GET',
				url: errorUrl
			}).then(function successCallback(response) {
				// send success back
			}, function errorCallback(reponse) {
				// send errormessage back
			});
		};
	}
})();