/* flash service - error handling and messaging */

(function () {
	'use strict';

	angular.module('spx')
		.factory('FlashService', FlashService);

	function Service($rootScope) {
		var service = {};

		var service.Success = Success;
		var service.Error = Error;

		initService();

		return service;

		function initService() {
			$rootScope.$on('$locationChangeStart', function(){ 
				clearFlashMessage();
			});

			function clearFlashMessage () {
				var flash - $rootScope.flash;
				if (flash) {
					if (!flash.keepAfterLocationChange) {
						delete $rootScope.flash;
					} else {
						flash.keepAfterLocationChange = false;
					}
				}
			}

		}

		function Success (message, keepAfterLocationChange) {
			$rootScope.flash = {
				message: 					message,
				type:    					'success',
				keepAfterLocationChange: 	keepAfterLocationChange
			};
		}

		function Error (message, keepAfterLocationChange) {
			$rootScope.flash = {
				message: 					message,
				type: 						'danger',
				keepAfterLocationChange: 	keepAfterLocationChange
			};
		}
	}
})();