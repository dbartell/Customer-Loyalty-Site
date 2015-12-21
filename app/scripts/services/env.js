'use strict';

angular.module(app.name).factory('$env', function ($resource) {
	var env = {};

	env.setSite = function(site) {
		env.site = site;
		console.log(site);

		// Implementing the site properties goes here
	};

	/*
		{
			"site": {
				"style": {
					"head":"....."
				},
				"logo": "url..."
			}
		}

	*/

	/*
		This service is used as a single source of truth for all UI/environment data
		and will be implemented last.
	*/

	return env;
});
