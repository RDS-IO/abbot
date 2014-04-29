var express = require("express");
var logfmt = require("logfmt");
var fs = require("fs");
var https = require('https');

var app = express();

var options = {
  key:  fs.readFileSync(__dirname + '/keys/key.pem'),
  cert: fs.readFileSync(__dirname + '/keys/key-cert.pem')
};

https.createServer(options, app).listen(443);

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
	var page = __dirname + "/public/index.html" 
	fs.readFile(page, function (err, data) {
		if (err) {
	  		res.writeHead(500);
	 		return res.end('Error loading index.html');
 	    }else{
 	    	res.writeHead(200);
	     	res.end(data);
	     	//res.send(page);
 		}
 	});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
