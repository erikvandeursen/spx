/* app. js
 # Angular ui-route is used here in favor of the native ng-route
 # Since the $stateProvider enables us to have multiple views on a single page
 # and further abstracts the use of Angular in js instead of the index.html file
 # and also gives us the option of parent-child relation
 # More on this: http://stackoverflow.com/questions/27645202/what-is-the-difference-between-routeprovider-and-stateprovider-in-angularjs
*/

(function () {
	/* define module and add ui-route as a dependency on it */

	'use strict';

	var spx = angular.module('spx', 
		['ui.router'/*, 'spx.login', 'spx.signup', 'spx.user', 'spx.playlists', 'spx.d3'*/]);

		spx.config(['$stateProvider', '$urlRouterProvider',
			function($stateProvider, $urlRouterProvider) {
			
			$urlRouterProvider.otherwise("/");

			/* state templates, similar to $routeProvider and .when in ng-route */
			$stateProvider
				/* public */
				.state('about', {
					url:          "/about",
					templateUrl:  'public/about.html',
					controller:   'publicController',
					controllerAs: 'publicCtrl'
				})
				.state('d3', {
					url:          "/about",
					templateUrl:  '',
					controller:   'd3Controller',
					controllerAs: 'd3Ctrl'
				})
				.state('error', {
					url:          "/error",
					templateUrl:  'error/error.html',
					controller:   'errorController',
					controllerAs: 'errorCtrl'
				})
				.state('login', {
					url:          "/login",
					templateUrl:  'login/login.html',
					controller:   'loginController',
					controllerAs: 'loginCtrl'
				})
				.state('signup', {
					url:          "/signup",
					templateUrl:  'signup/signup.html',
					controller:   'signUpController',
					controllerAs: 'signUpCtrl'
				})
				/* user */
				.state('user', {
					url: 		   "/me",
					templateUrl:   "dashboard/userinfo.html",
					controller:    "dashboardController",
					controllerAs:  "dashbordCtrl"  
				})
				.state('logout', {
					url:          "/logout",
					templateUrl:  'login/logout.html',
					controller:   'loginController',
					controllerAs: 'loginCtrl'
				})
				.state('playlist', {
					url:          "/dashboard/playlist",
					templateUrl:  'playlist/playlists.html',
					controller:   'playlistController',
					controllerAs: 'playlistCtrl'
				})
				.state('playlistAll', {
					url:          "/dashboard/playlist/all",
					templateUrl:  'playlist/playlist_all.html',
					controller:   'playlistController',
					controllerAs: 'playlistCtrl'
				})
				.state('playlistNew', {
					url:          "/dashboard/playlist/new",
					templateUrl:  'playlist/playlist_new.html',
					controller:   'playlistController',
					controllerAs: 'playlistCtrl'
				})
		}]);
	
	/* Run the app on init and check if user is logged in / out */
	/*
	spx.run(function ($rootScope, $location, $route, AuthService) {
		$rootScope.$on('$routeChangeStart',
			function (event, next, current) {
				AuthService.getUserStatus()
				.then(function () {
					if (next.access.restricted && !AuthService.isloggedIn()) {
						$location.path('/login');
						$route.reload();
					}
				});
			});
	});
	*/
})();
