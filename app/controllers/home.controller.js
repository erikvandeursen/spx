/* export-controller.js - export functionality */

(function () {
	'use strict';

	// define module and bind controller
	angular.module('spx')
		.controller('homeController', homeController);

	// inject dependencies
	homeController.$inject = ['$stateProvider'];

	function homeController () {
		//...
	}

})();