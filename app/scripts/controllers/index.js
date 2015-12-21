'use strict';

angular.module(app.name).controller('AppCtrl', ['$route', '$rootScope', function($route, $rootScope) {
  var self = this;
  self.title = 'Initial Title';
  $rootScope.$on('$routeChangeSuccess', function() {
    self.title = $route.current.title;
  });


}]);
