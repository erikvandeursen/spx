/* users.js - mongodb schema */

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema ({
	email: {
		type: String,
		unique: true,
		required: true 
	},
	name: {
		type: String,
		required: true
	},
	hash: String,
	salt: String
});

userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.generateJwt = function () {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign ({
		_id: this.id,
		email: this.email,
		name: this.name,
		exp: paseInt(expiry.getTime() / 1000),
		}, "MY_SECRET");
	};

mongoose.model('User', userSchema);

};
