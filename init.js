/* init.js - instantiate node.js server */

/* Load the HTTP library */
var express = require('express');
var app = express();

/* define port */
var port = process.env.port || 3000;

/* Listen to */
app.listen(port);
console.log('Listening on port ' + port);

