'use strict';

angular.module(app.name).service('$offers', function($http) {
	this.getOffers = function() {
		return $http({
			method: 'GET',
			url: '/v1/offers'
		})
		.then(function(response){
			return response;
		});
		// .error(function(data, status, headers, config) {
		//   $location.url('/404');
		// });
	};
});
