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

		factory.getRandomTrackObjectInfo = function () {
			String.prototype.shuffle = function () {
				var a = this.split(""),
				n = a.length;

				for (var i = n -1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var tmp = a[i];
					a[i] = a[j];
					a[j] = tmp;
				}
				return a.join("");
			}
			console.log("test".shuffle());
			
			return $http({
				url: 'https://api.spotify.com/v1/tracks/' + '0eGsygTp906u18L0Oimnem'.shuffle(),
				method: 'GET',
				cache: true
			});
			
		}

		// url:  'https://api.spotify.com/v1/tracks/0eGsygTp906u18L0Oimnem',
	
		return factory;

	}
})();