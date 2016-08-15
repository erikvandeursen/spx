/* signup-controller.js - signup functionality */
(function () {
	'use strict'; 

	angular.module('spx').controller('signUpController',
		['$scope', '$location', 'signUpFactory',
		function ($scope, $location, signUpFactory) {

			$scope.register = function () {

				/* initial values */
				$scope.error = false;
				$scope.disabled = true;

				/* Call register from service */
				signUpFactory.register($scope.registerForm.username, $scope.registerForm.password)

					/* Handle success */
					.then(function () {
						$location.path('/login');
						$scope.disabled = false;
						$scope.registerForm = {};
					})

					/* Handle errors */
					.catch(function () {
						$scope.error = true;
						$scope.errorMessage = "Something went wrong";
						$scope.disabled = false;
						$scope.registerForm = {};
					});
			};
		}]);
	}
)();

	// user validation: check on passwords by comparing passwordone and passwordtwo!