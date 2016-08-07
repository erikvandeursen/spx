/* server.js - Node.js and Express.js routing
# Angular takes over the front-end */

/* define routes */
app.get('home', require('../app/controllers/home.controller.js'));

/* app.get */
app.get('/', function (req, res) {
	console.log('Redirect to /home');
	return res.redirect('/home');
});