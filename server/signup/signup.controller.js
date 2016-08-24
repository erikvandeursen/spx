/* signup.controller.js - Server side signup controller */

/* dependencies */
//var passport = require('passport');
var User = require('../datasets/users.js');

/* module for signing up new user */
module.exports.signUp = function (req, res) {
	User.register(new User({
		username: req.body.username
	}),
	req.body.password, function (err, account) {
		if (err) {
			return res.status(500).json({
				err: err
			});
		}
		passport.authenticate('local')(req, res, function () {
			return res.status(200).json({
				status: 'Your account is succesfully made'
			});
		});
	});
}

