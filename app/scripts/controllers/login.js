'use strict';

angular.module(app.name).controller('loginCtrl', [ '$scope', '$location', '$auth', '$http', function ($scope, $location, $auth, $http) {

	$scope.ctrl = {
		contact: {},
		forgotPassword: false,
		messageSent: false
	};

	

	$scope.ctrl.login = function() {
		// Clear any existing error message
		$scope.ctrl.error = false;


		// Temporary
		if($scope.ctrl.forgotPassword) {
			$scope.ctrl.contact.___captcha = 'test';
			delete $scope.ctrl.contact.password;
		} else {
			if($scope.ctrl.contact.___captcha) {
				delete $scope.ctrl.contact.___captcha;
			}
		}


		$auth.check($scope.ctrl.contact).then(function(response) {
			console.log('response', response);
			// This should return a contact as part of the response.  Add that to the $auth service so it can be used elsewhere
			if(response.data && response.data.contact) { // Login was successful
				$auth.handleValidSession(response);
			} else if(response.data && response.data.message_id) {
				$scope.ctrl.messageSent = true; // Displays message indicating a password has been sent.
			} else {
				$scope.ctrl.error = 'There was an unknown error.'; // This should never be displayed.
			}



		}).catch(function(response) {
			// This functionality could be handled one time in the $httpProvider within app.config instead of each time there is an error
			if(response.data && response.data.error) {
				$scope.ctrl.error = response.data.error;
			} else {
				$scope.ctrl.error = 'There was an error logging in.';
			}
		})
	};
}]);
