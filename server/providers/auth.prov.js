/* Auth prov */

/* generate state as hash next to send with the activation code */

var userauth = require('../includes/userauth.json');
var configauth = require('../includes/configauth.json');

/* constructor */
function authProvider () {
	'use strict';

	/* method to create random string for state calls */
	function generateRandomNumber (length) {
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

			for (var i = 0; i < length; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		};

	/* API credentials as properties */
	this.clientId = userauth['client_id'],
	this.clientName = userauth['client_name'],
	this.clientSecret = configauth['client_secret'],
	this.redirectUri = configauth['redirect_uri'],
	this.scopes = configauth['scopes'];
	//this.state = generateRandomNumber(16);

};
