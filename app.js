var express = require("express");
var bodyParser = require('body-parser')
var request = require('request');
var fetch = require('./pttFetch.js');

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
app.get('/test', function(req, res){
	fetch(function(data){
		res.send(data);
		//console.log(data);
	});
});
var verify_token = "abcdefg";
app.get('/fbhook', function (req, res) {
	console.log(verify_token);
	console.log(req.query['hub.verify_token']);
    if (req.query['hub.verify_token'] === verify_token) {
		console.log("verify ok");
        res.send(req.query['hub.challenge']);
    }else{
		console.log("verify not ok");
		res.send('Error, wrong validation token');
	}
});

app.post('/fbhook/', function(req, res){
	console.log("ininini");
	var messaging_events = req.body.entry[0].messaging;
    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;
        if (event.message && event.message.text) {
            var text = event.message.text;
			console.log("here comes sender : " + sender);
			if(text.indexOf("girl")!=-1){
				fetch(function(link){
					sendTextMessage(sender, link);
				});
			}else{
				sendTextMessage(sender, "Echo: " + text.substring(0, 200));
			}
        }
    }
	res.sendStatus(200);
});

var pageToken = "CAAU2S3HRFS0BAObt4B9FdNWcUXZCguZCcEig3r6OLxsDSGTqjhApACeT00jfkC37sdpE48BMBe5ApqxZAsODUGMnqes8ZC6JADonvYXRETNu3yDZBEy6uSHkj7ZBzrNCQZAeDVcBSbE2oeknjbSeilKh3sowAnIN089637zItjQaIFZBgri6ica3uQLOW8k2S2oBqWqPslZAfGgZDZD"
function sendTextMessage(sender, text) {
    var messageData = {
        text: text
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: pageToken},
        method: 'POST',
        json: {
            "recipient": {"id": sender},
            "message": messageData
        }
    }, function (error, response) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});
