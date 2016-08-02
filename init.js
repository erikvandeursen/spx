/* init.js - instantiate node.js server */

/* Load the HTTP library */
var http = require('http');

/* define port */
var port = process.env.port || 3000;

/* Create an HTTP server to handle responses */
http.createServer(function (req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Node.js server up! ");
	res.write("Listening on port " + port);
	res.end();
})
.listen(port);

/* console.log for shell and devtools */
console.log("Listening on port " + port);