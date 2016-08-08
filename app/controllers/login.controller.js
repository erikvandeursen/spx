/* login-controller.js - all functionality on the login */
(function () {
	'use strict'; 

	angular.module('spx')
		.controller('loginController', loginController);
	
	/* inject factory */
	loginController.$inject = ['$location', 'loginFactory'];

	// function exportController
	function loginController ($location, loginFactory) {
		//...
		var vm = this;

		vm.cred = {
			email: "",
			password: ""
		};

		/*
		vm.load = function {
			$http.get('/logins')
				.success(function (data, status, headers, config) {
					$scope.logins = data;
				})
				.error (function (data, status, headers, config) {
					console.log(status);
					console.log(error);
				})
		}

		vm.load();

		loginFactory.save();
		*/
	}
	
})();	