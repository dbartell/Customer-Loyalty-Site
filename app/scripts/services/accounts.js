'use strict';

angular.module(app.name).service('$accounts', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
	var service = this;

	service.index = function() {
		return $http({
			method:'GET',
			url:'/v1/accounts'
		});

	};

}]);
