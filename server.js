/* server.js - Node.js and Express.js routing
# Angular takes over the front-end */

'use strict';

/* requires */
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');

/* define var app for Express */
var app = express();

/* Listen to */
app.listen(process.env.port || 3000, function () {
	console.log('SPX app listening op port 3000');
});

/* define routes */
app.use('/', express.static(__dirname + '/'));
console.log(__dirname);

/* Mongoose connection */
//mongoose.connect('mongodb://localhost/spxdb');

/* Passport and db connections */
//require('./includes/passport.js');
//require('./datasets/db.js');

/* set up the express application */
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());

/* Passport config */
app.use(passport.initialize());
app.use(passport.session());
