/* passport config */

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

// use a local strategy as described here: https://github.com/jaredhanson/passport-local
passport.use(new localStrategy(
	function (username, password, done) {
		User.findOne({ username: username , function (err, user) {
			if (err) {
				return done(err);
			}
			/* User not found in database */
			if (!user) {
				return done(null, false, {
					message: 'Cannot find this user';
				});
			}
			/* Return if password is wrong */
			if (!user.verifyPassword(password)) {
				return done(null, false, {
					message: 'Password is wrong';
				});
			}
			/* If everything is correct, return the user object */
			return done(null, user);
		});
	}
));