/* login.controller.js - Server side login en logout controller */

/* dependencies */
var passport = require('passport');
var User = require('../datasets/users.js');

/* module for logging in user */
module.exports.logIn = function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return next (err);
		}
		if (!user) {
			return res.status(401).json ({
				err: info
			});
		}
		req.logIn(user, function (err) {
			if (err) {
				return res.status(500).json({
					err: "User could not login"
				});
			}
			res.status(200).json({
				status: "Login succesful"
			});
		});
	})(req, res, next);
}

/* module for logging out user */
module.exports.logOut = function (req, res) {
	req.logout();
	res.status(200).json({
		status: "You are now logged out. Bye!"
	});
}

module.exports.getStatus = function (req, res) {
		if (!req.isAuthenticated()) {
			return res.status(200).json({
			  status: false
		});
  	}
	res.status(200).json({
	status: true
	});
};
