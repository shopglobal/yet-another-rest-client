/**
 * Authorization service. Contains business logic to aid in generating the Auth Header.
 */
clientApp.service('auth', function() {
	var helper = this;
	var authToken = {};

	helper.get = function() {
		return authToken;
	};

	helper.set = function(value) {
		if (angular.isObject(value)) {
			authToken['value'] = value.value;
		} else {
			authToken['value'] = value;
		}
	};

	/**
	 * Generates a 'Basic Authorization' value.
	 */
	helper.generateBasicAuthHeader = function(name, password) {
		var unencoded = name + ":" + password;
		var encoded = btoa(unencoded);
		return "Basic " + encoded;
	};

	/**
	 * Decode the base-64 encoded username and password from the 'Basic Authorization' value.
	 *
	 * Example: Basic Zm9vOmJhcg==
	 */
	helper.decodeAuthValue = function() {
		var header = helper.get().value;
		if (!header) {
			return {};
		}

		//Remove any boilerplate text preceding the value.
		var encoded = header.substring(header.lastIndexOf(" "));

		var unencoded = "";
		try {
			//Attempt to decode the base-64 encoded value.
			unencoded = atob(encoded);
		} catch (e) {}

		//Separate the username and password.
		console.log(unencoded);
		var credentials = unencoded.split(":"); //TODO just split on the first ":".
		console.log(credentials);
		if (credentials.length <= 1) {
			return {};
		}
		return {name: credentials[0], password: credentials[1]};
	};
});
