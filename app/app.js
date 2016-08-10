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
					controller:   '',
					controllerAs: ''
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
				.state('usersettings', {
					url: 		   "/user/user_settings",
					templateUrl:   "app/views/user/settings.user.html",
					controller:    "",
					controllerAs:  ""  
				})
				.state('spotifysettings', {
					url: 		   "/user/spotify_settings",
					templateUrl:   "app/views/user/settings.spotify.html",
					controller:    "",
					controllerAs:  ""  
				})

				// sandbox
				.state('sandbox', {
					url:          "/sandbox",
					templateUrl:  './sandbox/sandbox.html',
					controller:   'sandboxController',
					controllerAs: 'sandboxCtrl'
				});
		});
})();
