/* Angular user controller */

(function () {
	'use strict';

	angular.module('spx')
		.controller('userController', userController, ['http']);

	userController.$inject = ['$routeProvider', '$http'];

	function userController ($routeProvider, $http) {
		var vm = this,
			url = 'http://localhost:3000/#/user/spotify_settings';

		$http({
			method: 'get',
			url: url
		}).then(function (getUserInfo) {
			vm.userinfo = getUserInfo.data;
		}).catch(function (err) {
			console.log('Fout opgetreden ' + err)
		});
	}

})();