/* Routing.js - wiring up all the routing as defined on $stateProvider (angular ui-router) */

'use strict';

/* define configuration blocks and routes */
	angular.module('spx')
		.config(['$stateProvider', '$urlRouterProvider',
			function($stateProvider, $urlRouterProvider) {

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
				.state('dashboard', {
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
					url:          "/me/playlist",
					templateUrl:  'playlist/playlist.html',
					controller:   'playlistController',
					controllerAs: 'playlistCtrl'
				})
				.state('playlistAll', {
					url:          "/me/playlist/all",
					templateUrl:  'playlist/playlist_all.html',
					controller:   'playlistController',
					controllerAs: 'playlistCtrl'
				})
				.state('playlistNew', {
					url:          "/me/playlist/new",
					templateUrl:  'playlist/playlist_new.html',
					controller:   'playlistController',
					controllerAs: 'playlistCtrl'
				})

				/* default to '/' when URI not found */
				$urlRouterProvider.otherwise("/");

				/* use the HTML5 History API */
        		//$locationProvider.html5Mode(true);
		}]);