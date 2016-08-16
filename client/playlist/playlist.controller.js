/* UserInfo prov - controller for handling user info from API calls */

(function () {
	'use strict';

	angular.module('spx.playlists', [])
		.controller('userInfoController', ['$scope', '$state', 'playlistFactory', function ($scope, $state, playlistFactory) {
			
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
