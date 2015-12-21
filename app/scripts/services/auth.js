'use strict';

angular.module(app.name).factory('$auth', ['$env', '$http', '$location', '$rootScope', function($env, $http, $location, $rootScope) {
    var $auth = {};

    $auth.handleValidSession = function(response) {
        if(!response || !response.data) {
            return;
        }

        if(response.data.site) {
            $env.setSite(response.data.site);
        }

        if(!response.data.contact) {
            $location.path('/login');
            return;
        }

    	$auth.contact = response.data.contact;
    	$auth.contact.password = null; // This is not necessary

		if(response.data.temporary_password) { // Login used a temporary password.  This flag will be used on the profile page to be more strict
			$auth.temporary_password = true;
			$location.path('/profile');
		} else {
			$auth.temporary_password = false;
			if(!$location.path() || $location.path() === '/login') {
				$location.path('/offers'); // Redirect to offers on a successful login
			}
		}
    }


    // Performs a GET on the session if contact is NOT provided to check whether already logged in
    // Performs a POST on the session if contact is provided in an attempt to authenticate
    $auth.check = function(contact) {
    	// If no contact is passed in an attempt to skip the login page based on session will be made

    	// This will be the case if the contact is already logged in and contact is bootstrapped
    	// inside of the php generated HTML
    	if($auth.contact && $auth.contact._id) {
    		if(!$location.path() || $location.path() === '/login') {
				$location.path('/offers');
			}
			return;
		} /*else if((!$auth.contact || !$auth.contact._id) && ($location.path() && $location.path() !== '/login')) {
			$location.path('/login');
			return;
		}*/

        // The rest of this performs an initial check of the session (for development purposes).
        // If they are logged in then redirect to offers, otherwise stay.
        var params = {
			method:'GET',
			url:'/v1/session'
		};

		if(contact) {
			params.method = 'POST';
			params.data = contact;
		}

		$rootScope.$emit('StartLoading');


		var promise = $http(params);

		promise.then(function(response) {
			$auth.handleValidSession(response);
		}).finally(function() {
			$rootScope.$emit('StopLoading');
		});

		return promise;
    };


    $auth.update = function() {
    	if(!$auth.contact._id) {
    		return alert('There is no contact id.');
    	}

    	$rootScope.$emit('StartLoading');

    	var promise = $http({
    		method:'PUT',
    		url:'/v1/contacts/' + $auth.contact._id,
    		data:$auth.contact
    	});

    	promise.then(function(response) {
    		if(response.data) {
    			$auth.contact = response.data;
    			$auth.contact.password = null; // Password data is not necessary
    			$auth.temporary_password = false; // Assume that any successful update eliminates the need for a password
    		}
    	}).catch(function(response) {
    		alert('There was an error updating your information.');
    	}).finally(function() {
    		$rootScope.$emit('StopLoading');
    	});

    	return promise;

    };

    $auth.destroy = function() {
    	$rootScope.$emit('StartLoading');
		$http({
			method:'DELETE',
			url:'/v1/session'
		}).finally(function() {
			if($auth.contact) { delete $auth.contact; }
			$location.path('/login');
			$rootScope.$emit('StopLoading');
		});
    };

    if(app.session) {
        $auth.handleValidSession({data:app.session});
    }

    return $auth;
}]);
