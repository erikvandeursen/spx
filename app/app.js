/* app. js
 # Angular ui-route is used here in favor of the native ng-route
 # Since the $stateProvider enables us to have multiple views on a single page
 # and further abstracts the use of Angular in js instead of the index.html file
 # and also gives us the option of parent-child relation
 # More on this: http://stackoverflow.com/questions/27645202/what-is-the-difference-between-routeprovider-and-stateprovider-in-angularjs
*/

(function () {
	/* define module and add ui-route as a dependency on it */
	angular.module('spx', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider) {
			
			$urlRouterProvider.otherwise("/");

			/* state templates, similar to $routeProvider and .when in ng-route */
			$stateProvider
				/* public */
				.state('about', {
					url:          "/about",
					templateUrl:  'app/views/public/about.html',
					controller:   '',
					controllerAs: ''
				})
				.state('auth', {
					url:          "/auth",
					templateUrl:  'app/views/public/auth.html',
					controller:   '',
					controllerAs: ''
				})
				.state('auth_login', {
					url:          "/auth_login",
					templateUrl:  'app/views/public/auth.html',
					controller:   'authController',
					controllerAs: 'authCtrl'
				})
				.state('callback', {
					url:          "/callback",
					templateUrl:  'app/views/public/callback.html',
					controller:   '',
					controllerAs: ''
				})
				.state('error', {
					url:          "/error",
					templateUrl:  'app/views/public/error.html',
					controller:   'errorController',
					controllerAs: 'errorCtrl'
				})
				.state('home', {
					url:          "/home",
					templateUrl:  'app/views/public/home.html',
					controller:   '',
					controllerAs: ''
				})
				.state('login', {
					url:          "/login",
					templateUrl:  'app/views/public/login.html',
					controller:   'loginController',
					controllerAs: 'loginCtrl'
				})
				.state('logout', {
					url:          "/logout",
					templateUrl:  'app/views/public/logout.html',
					controller:   'loginController',
					controllerAs: 'loginCtrl'
				})
				.state('signup', {
					url:          "/signup",
					templateUrl:  'app/views/public/signup.html',
					controller:   'signupController',
					controllerAs: 'signupCtrl'
				})
				/* user */
				.state('dashboard', {
					url: 		   "/user/dashboard",
					templateUrl:   "app/views/user/dashboard.html",
					controller:    "",
					controllerAs:  ""  
				})
				.state('playlist', {
					url:          "/user/playlists",
					templateUrl:  'app/views/user/playlists.html',
					controller:   'playlistController',
					controllerAs: 'playlistCtrl'
				})
				.state('spotifysettings', {
					url: 		   "/user/spotify_settings",
					templateUrl:   "app/views/user/settings.spotify.html",
					controller:    "userInfoController",
					controllerAs:  "userInfoCtrl"  
				})
				.state('usersettings', {
					url: 		   "/user/user_settings",
					templateUrl:   "app/views/user/settings.user.html",
					controller:    "userInfoController",
					controllerAs:  "userInfoCtrl"  
				})

				// sandbox
				.state('sandbox', {
					url:          "/sandbox",
					templateUrl:  './sandbox/sandbox.html',
					controller:   'sandboxController',
					controllerAs: 'sandboxCtrl'
				});
		});
	
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
