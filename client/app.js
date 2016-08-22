/* app. js - setting up modules, routing and directives for Angular */
(function() {

'use strict';

/* define main module spx and inject other modules on it */
var app = angular.module('spx', ['ui.router', 'ngCookies']);
console.log('app.js gezien');
/* define routes */
app.config(function($urlRouterProvider, $stateProvider) {
	//$locationProvider.html5Mode(true);
	
	$urlRouterProvider.otherwise("/state1");

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
		.state('faq', {
			url: '/error',
			templateUrl: 'public/faq.html',
		})
		/* user */
		.state('userinfo', {
			url: '/me/userinfo',
			templateUrl: 'dashboard/userinfo.html',
			controller: 'dashboardController'
		})
		.state('playlist', {
			url: '/me/playlist',
			templateUrl: 'track/tracks.html',
			controller: 'trackController'
		})
		.state('allplaylists', {
			url: '/me/playlist/all',
			templateUrl: 'playlist/playlist_all.html',
			controller: 'playlistController'
		})
		.state('newplaylist', {
			url: '/me/playlist/new',
			templateUrl: 'playlist/playlist_new.html',
			controller: 'playlistController'
		})
		.state('logout', {
			url: '/logout',
			templateUrl: 'login/logout.html',
			controller: 'loginController'
		})
      });

})();