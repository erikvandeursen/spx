// dev only!

(function () {
	'use strict';

	angular.module('spx')
		.factory('sandboxFactory', sandboxFactory);

	sandboxFactory.$inject = ['$http', '$q'];

	function sandboxFactory ($http, $q) {

		var factory = {};

		factory.sendMsg = "Factory gezien";

		factory.getTrackObjectInfo = function () {
			return $http({
				url:  'https://api.spotify.com/v1/tracks/0eGsygTp906u18L0Oimnem',
				method: 'GET',
				cache: true
			});
		}

		// url:  'https://api.spotify.com/v1/tracks/0eGsygTp906u18L0Oimnem',
	
		return factory;

	}
})();