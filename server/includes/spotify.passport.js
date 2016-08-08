/* Spotify passport auth */

passport.use (new SpotifyStrategy ({
	clientID: 		client_id,
	clientSecret: 	client_secret,
	callbackURL: 	"http://localhost:3000/user/dashboard"
},
function (accessToken, refreshToken, profile, done) {
	User.findOrCreate( {
		spotifyId: profile.id
	},
	function (err, user) {
		return done(err, user);
	});
}));