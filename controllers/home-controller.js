/* export-controller.js - export functionality */

(function () {
	'use strict';

	// define module and bind controller
	angular.module('spx')
		.controller('homeController', homeController);

	// inject dependencies
	homeController.$inject = ['loginFactory'];

	// function exportController
	function homeController () {
		//...
		var vm = this;
		vm.sendMsg = "Controller gezien";

		vm.showLoginMenu = function () {
			console.log('seen');
			loginFactory.showLoginMenu();
		}
	}
})();