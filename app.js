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
var verify_token = "abcdefg";
app.get('/fbhook', function (req, res) {

    if (req.query['hub.verify_token'] === verify_token) {
        res.send(req.query['hub.challenge']);
    }

    res.send('Error, wrong validation token');

});

app.post('/fbhook/', function(req, res){
	console.log("ininini");
	var messaging_events = req.body.entry[0].messaging;

    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;
		console.log(event);
		console.log(sender);

        if (event.message && event.message.text) {
            var text = event.message.text;
            sendTextMessage(sender, "Echo: " + text.substring(0, 200));
        }
    }
	res.sendStatus(200);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});
