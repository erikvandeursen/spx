/* define routes */
app.get('home', require('./controllers/home-controller.js'));

/* app.get */
app.get('/', function (req, res) {
	console.log('Redirect to /home')
	return res.redirect('/home');
});