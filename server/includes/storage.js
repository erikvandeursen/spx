(function () {

	'use strict';

	/* Check for handling storage on given browser */
	if (window.addEventListener) {
		window.addEventListener("storage", handle_storage, false);
	} else {
		window.attachEvent("onstorage", handle_storage);
	};

	/* if IE attach to window.event */
	function handle_storage(e) {
		if (!e) {
			e = window.event;
		}
	}

	/* declare new localStorage instance and assign it to variable */
	var storage = window.localStorage;

	/* check if localStorage exists and set new / overwrite */

	/* set new token with hash (timestamp) */

	/* get token */


})();
