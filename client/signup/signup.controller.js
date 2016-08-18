/* signup-controller.js - signup functionality */
(function () {
	'use strict'; 

	angular.module('spxSignup')
		.controller('signUpController',
			['$scope', '$location', 'signUpFactory',
			function ($scope, $location, signUpFactory) {

				$scope.signUp = function () {

					/* initial values */
					$scope.error = false;
					$scope.disabled = true;

					/* Call register from service */
					signUpFactory.signUp($scope.signUpForm.username, $scope.signUpForm.email, $scope.signUpForm.password)

						/* Handle success */
						.then(function () {
							$location.path('/login');
							$scope.disabled = false;
							$scope.signUpForm = {};
						})

						/* Handle errors */
						.catch(function () {
							$scope.error = true;
							$scope.errorMessage = "Something went wrong";
							$scope.disabled = false;
							$scope.signUpForm = {};
						});
				};
			}]);
	}
)();

	// user validation: check on passwords by comparing passwordone and passwordtwo!