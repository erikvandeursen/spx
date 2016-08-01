// sandbox controller REMOVE ON PROD!
(function () {
	'use strict';

	angular.module('spx')
		.controller('sandboxController', sandboxController);

	sandboxController.$inject = ['sandboxFactory'];

	function sandboxController (sandboxFactory) {
		var vm = this;

		vm.sendMsg = "Controller gezien";
		vm.factoryMsg = sandboxFactory.sendMsg;

		vm.sobjects = [];

		vm.getObjectTrackInfo = function () {
			sandboxFactory.getTrackObjectInfo()
			.then(function success(result) {
				var data = result.data;
				vm.sobjects = data;
				console.log(vm.sobjects);
			},
			function error (err) {
				console.log(err);
			});
		}

		vm.rsobjects = [];

		vm.getRandomObjectTrackInfo = function () {
			sandboxFactory.getRandomTrackObjectInfo()
			.then(function success (result) {
				var data = result.data;
				vm.rsobjects = data;
				console.log(vm.objects);
			});
		}
	}

})();