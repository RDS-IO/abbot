var express = require("express");
var logfmt = require("logfmt");
var fs = require("fs");
var https = require('https');

var app = express();

app.set('views', __dirname+'/public');
app.engine('html', require('ejs').renderFile);
app.use(logfmt.requestLogger());
app.use('/js', express.static(__dirname + '/public/js'));

app.get('/', function(req, res) {
	res.render('index.html');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
