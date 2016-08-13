/* auth controller - Handler for all serverside errors */

var request = require('request');
var queryString = require('querystring');

/* handles all errors thrown in HTTP endpoints */
module.exports.errorHandling = function(req, res) {
	request.get('token_set_wrong')
		 .on('response', function(response) {
		    console.log(response.statusCode + '\n') // 200 
		    console.log(response.headers['content-type'] + '\n')
		    console.log('token couldn\'t be parsed');
		  });

	request.get('token_instantiate')
		.on('response', function(response) {
			console.log(response.statusCode + '\n') // 200 
			console.log(response.headers['content-type'] + '\n')
			console.log('problem found while instantiating token');
		});

	request.get('status_or_code_not_set')
		.on('response', function(response) {
			console.log(response.statusCode + '\n') // 200 
			console.log(response.headers['content-type'] + '\n')
			console.log('HTTP status not 200 or wrong code');
		});
 }