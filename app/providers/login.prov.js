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

	factory.save = function () {
		$http.post('login', angular.toJson($scope.username, $scope.password))
			.success(function () {
				$scope.load();
			});
	};

		return factory;
	}

})();