'use strict';

angular.module(app.name).controller('offersCtrl', ['$scope', '$http', '$offers', '$auth', function($scope, $http, $offers, $auth) {

	$scope.$auth = $auth;

	$offers.getOffers().then(function(response) {
		$scope.offers = response.data;
		console.log($scope.offers);

		for(var i = 0; i < $scope.offers.length; i++) {
			if(!$scope.offers[i].account_id) {
				$scope.offers[i].account_id = 'All Locations';
			}
		}
	});

}]);
