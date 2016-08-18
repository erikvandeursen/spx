/* app. js
 # Angular ui-route is used here in favor of the native ng-route
 # Since the $stateProvider enables us to have multiple views on a single page
 # and further abstracts the use of Angular in js instead of the index.html file
 # and also gives us the option of parent-child relation
 # More on this: http://stackoverflow.com/questions/27645202/what-is-the-difference-between-routeprovider-and-stateprovider-in-angularjs
*/

(function () {
	
	'use strict';

	/* define all modules with no dependencies on them */
	//angular.module('spxDashboard', []);
	//angular.module('spxPlaylist', []);
	//angular.module('spxD3', []);
	//angular.module('spxLogin', []);
	//angular.module('spxSignup', []);

	/* define main module and inject other modules in it */
	angular.module('spx', [
		'ui.router',
		'spxDashboard',
		'spxPlaylist',
		//'spxD3',
		//'spxLogin',
		//'spxSignup'
	]);
})();
