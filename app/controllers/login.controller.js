/* login-controller.js - all functionality on the login */
(function () {
	'use strict'; 

	angular.module('spx')
		.controller('loginController', loginController);
	
	/* inject factory */
	loginController.$inject = ['loginFactory'];

	// function exportController
	function loginController () {
		//...
		var vm = this;

		vm.showLoginMenu = function () {
			console.log('seen');
			loginFactory.showLoginMenu();
		}

		/* verify input and return message */
		
		// http://jasonwatmore.com/post/2015/12/09/MEAN-Stack-User-Registration-and-Login-Example.aspx
		vm.verify = function () {
			/* get */

			/* verify */

			if () {

			}
		}
	}
	
})();	