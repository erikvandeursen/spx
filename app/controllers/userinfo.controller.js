/* UserInfo prov - controller for handling user info from API calls */

(function () {
	'use strict';

	angular.module('spx')
		.controller('userInfoController', ['$scope', '$state', 'userInfoFactory', function ($scope, $state, userInfoFactory) {
			
			/* controller used for getting user info out of the Spotify API via factory */
			$scope.userInfoController = function () {
				userInfoFactory.getUserInfo()
				.then(function successCallback(res) {
						$scope.userinfos = response;
		 			}, function errorCallback(err) {
				    	console.log(err);
				    }
				)}
		}])

})();
