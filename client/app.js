/* app. js - setting up modules, routing and directives for Angular */
(function() {

'use strict';

/* define module spx and inject dependencies on it */
var app = angular.module('spx', ['ui.router', 'ngCookies', 'ngMaterial', 'nvd3']);

/* define routes */
app.config(function($urlRouterProvider, $stateProvider) {
	
	$urlRouterProvider.otherwise("/userinfo");

	$stateProvider
		/* public */
		.state('about', {
			url: '/about',
			templateUrl: 'public/about.html',
		})
		.state('error', {
			url: '/error',
			templateUrl: 'error/error.html',
			controller: 'errorController'
		})
		/* user */
		.state('userinfo', {
			url: '/userinfo',
			templateUrl: 'dashboard/userinfo.html',
			controller: 'dashboardController'
		})
		.state('playlist', {
			url: '/playlist/all',
			templateUrl: 'playlist/playlist_all.html',
			controller: 'playlistController'
		})
		.state('newplaylist', {
			url: '/playlist/new',
			templateUrl: 'playlist/playlist_new.html',
			controller: 'playlistController'
		})
		.state('logout', {
			url: '/logout',
			templateUrl: 'login/logout.html',
			controller: 'logOutController'
		})
		/* generative state */
		.state('tracks', {
			url: '/playlist/tracks',
			templateUrl: 'track/tracks.html',
			controller: 'trackController'
		})
		.state('trackinfo', {
			url: '/playlist/tracks/details',
			templateUrl: 'track/trackinfo.html',
			controller: 'trackInfoController'
		})
      });

})();