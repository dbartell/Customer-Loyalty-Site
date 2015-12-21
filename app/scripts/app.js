'use strict';

angular.module(app.name, [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'mobile-angular-ui',
	'mobile-angular-ui.gestures',
	'ngActivityIndicator'

]).config(['$routeProvider', function ($routeProvider) {

	//$locationProvider.html5Mode(true);

	$routeProvider
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginCtrl',
		})
		.when('/changePassword', {
			templateUrl: 'views/changePassword.html',
			controller: 'changePasswordCtrl'
		})
		.when('/offers', {
			templateUrl: 'views/offers.html',
			controller: 'offersCtrl',
			title: 'Offers'
		})
		.when('/locations', {
			templateUrl: 'views/accounts.html',
			controller: 'accountsCtrl',
			title: 'My Locations'
		})
		.when('/locations/:locationId', {
			templateUrl: 'views/accountDetails.html',
			controller: 'detailsCtrl',
			title: 'My Locations'
		})
		.when('/profile', {
			templateUrl: 'views/profile.html',
			controller: 'profileCtrl',
			title: 'My Profile'
		})

		// OTHERWISE //
		.otherwise({
			redirectTo: '/login'
		});
}]).run(['$rootScope', '$auth', '$activityIndicator', '$timeout', '$location', function($rootScope, $auth, $activityIndicator, $timeout, $location) {
	var history = [];

	$rootScope.$on('$routeChangeSuccess', function() {
		history.push($location.$$path);
	});

	$rootScope.back = function() {
		var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
		$location.path(prevUrl);
	};

	$rootScope.$auth = $auth;

	// Set up loading indicator
	$rootScope.$on('StartLoading', function() {
		// Display loading indicator
		$activityIndicator.startAnimating();
	});

	$rootScope.$on('StopLoading', function() {
		// Debounce and then hide the loading indicator
		$activityIndicator.stopAnimating();
	});

	$rootScope.$on('$locationChangeSuccess', function() {
		$auth.check();
		$rootScope.backButtonEnabled = false;
	});

}]);
