/* app. js
 # Angular ui-route is used here in favor of the native ng-route
 # Since the $stateProvider enables us to have multiple views on a single page
 # and further abstracts the use of Angular in js instead of the index.html file
 # and also gives us the option of parent-child relation
 # More on this: http://stackoverflow.com/questions/27645202/what-is-the-difference-between-routeprovider-and-stateprovider-in-angularjs
*/

(function () {
	// define module and add ui-route as a dependency on it
	angular.module('spx', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider) {
			
			$urlRouterProvider.otherwise("/");

			// state templates, similar to $routeProvider and .when in ng-route
			$stateProvider
				.state('about', {
					url:          "/about",
					templateUrl:  'views/about.html',
					controller:   '',
					controllerAs: ''
				})
				.state('/home', {
					url:          "/home",
					templateUrl:  'views/home.html',
					controller:   'homeController',
					controllerAs: 'homeCtrl'
				})
				.state('login', {
					url:          "/login",
					templateUrl:  'views/login.html',
					controller:   'loginController',
					controllerAs: 'loginCtrl'
				})
				.state('signup', {
					url:          "/signup",
					templateUrl:  'views/signup.html',
					controller:   'signupController',
					controllerAs: 'signupCtrl'
				})
				// remove on production
				.state('sandbox', {
					url:          "/sandbox",
					templateUrl:  'views/sandbox.html',
					controller:   'sandboxController',
					controllerAs: 'sandboxCtrl'
				})
		});
})();
