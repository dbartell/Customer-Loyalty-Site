'use strict';

angular.module(app.name).controller('profileCtrl', ['$scope', '$auth', '$location', function($scope, $auth, $location) {

	$scope.$auth = $auth;
	console.log($scope.$auth);

	$scope.birthday = {
		month: 'Month',
		day: 'Day',
		year: 'Year'
	};


	$scope.save = function(birthday) {
		if ($auth.temporary_password && !$auth.contact.password) {
			return alert('Please choose your password.');
		}
		if (!$auth.contact.birthday) {
		$auth.contact.birthday = birthday.year + '-' + birthday.month + '-' + birthday.day;
		}

		$auth.update().then(function() {
			$location.path('/offers');
			// Optionally display a message that the contact data was updated successfully.
		});
	};

	// PASSWORD SHOW/HIDE //
	$scope.inputType = 'password';

	$scope.hideShowPassword = function() {
		if ($scope.inputType === 'password')
			$scope.inputType = 'text';
		else
			$scope.inputType = 'password';
	};

}]);
