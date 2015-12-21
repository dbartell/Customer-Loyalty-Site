'use strict'

angular.module(app.name)
.directive('desktopNav', function(){
  return {
    templateUrl: './views/desktopnav.html'
  };
})
.directive('mobileNav', function(){
  return {
    templateUrl: './views/mobilenav.html'
  };
})
.directive('activity', function(){
  return {
    templateUrl: './views/activity.html'
  };
})
.directive('pageHead', function(){
  return {
    templateUrl: './views/head.html'
  };
});
