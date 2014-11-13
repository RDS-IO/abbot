var express = require("express");
var logfmt = require("logfmt");

var app = express();

app.set('views', __dirname+'/public');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/js', express.static(__dirname + '/public/js'));

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
	res.redirect('/home');
});

app.get('/home', function(req, res) {
	res.render('index.html');
});

//for angular to fetch
app.get('/partials/:name', function(req, res){
	var name = req.params.name;
	res.render('partials/' + name);
});

app.get('*', function(req, res){
	res.redirect('/home');
})

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});
