var express = require("express");
var bodyParser = require('body-parser')

var app = express();

app.set('views', __dirname+'/public');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/js', express.static(__dirname + '/public/js'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	console.log("here i am");
	res.send('hello, world!');
});

app.get('/echo', function(req, res){
	//var name = req.params.name;
	//console.log(name);
	console.log("on echo");
	res.send('lalalal');
});


app.post('/fbhook', function(req, res){
	console.log("ininini");
	console.log(req.body);
	console.log(req.body);
	res.sendStatus(200);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});
