'use strict';

angular.module(app.name).controller('accountsCtrl', ['$scope', '$accounts', function($scope, $accounts) {

	$accounts.index().then(function(response) {
		$scope.locations = response.data;
		console.log($scope.locations);
	});

}]);
