angular.module(app.name).controller("detailsCtrl", ['$scope', '$routeParams', '$accounts', function($scope, $routeParams, $accounts) {

  $accounts.index().then(function(response) {
    $scope.locations = response.data;
    $scope.local = $routeParams.locationId;
    console.log($scope.locations);
  });

  $scope.offers = [{
      'name' : 'Great Deal',
      'points' : '4'
    },
    {
      'name' : 'Wowzer',
      'points' : '25'
  }];

}]);
