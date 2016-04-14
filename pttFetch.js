var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

var options = {
    url:'https://www.ptt.cc/bbs/Beauty/index.html',
    headers : {Cookie : 'over18=1'},
    method : 'GET'
};

var fetchGirl = function(callback){
    request(options, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        } else {
            var data = rawHtmlToData(body);
            for(var i=0; i<data.length; i++){
                if(data[i].title.indexOf("[正妹]")!=-1){
                    callback('https://www.ptt.cc'+data[i].link);    
                }
            }
        }
    });
}

//private util sections
function rawHtmlToData(rawHTML){
    var result = [];
    var doms = cheerio.load(rawHTML);
    doms(".r-list-container > .r-ent").each(function(idx, e){
        var tmpObj = {};
        tmpObj.link = doms(e).children('.title').children().attr('href');
        tmpObj.title = doms(e).children('.title').text();
        tmpObj.nrec = doms(e).children('.nrec').text();
        tmpObj.date = doms(e).children('.meta').children('.date').text();
        tmpObj.author = doms(e).children('.meta').children('.author').text();
        result.push(tmpObj);
    });
    return result.reverse();
}

module.exports = fetchGirl;

/*
var doms = cheerio.load(rawHTML);
var link = 'default';
doms('#action-bar-container a').each(function(idx, e){
    if(doms(this).text() == '?~@? ?~J?| ~A'){
        link = doms(this).attr('href');
    }
});
console.log(">>>> : " + link);
console.log("number : " + link.match(/\d+/)[0]);
var pttPageCount = link.match(/index\d+/)[0].match(/\d+/)[0];
var neededPageCount = pttPageCount - (page - 2);
console.log("need number : " + neededPageCount);
var neededLink = link.replace(pttPageCount, neededPageCount);
options.path = neededLink;
rawHTML = "";
var shttpReq = https.request(options, function(res){
    res.on('data', function(chunk){
        rawHTML += chunk;
    });
    res.on('end', function(){
        callback(JSON.stringify(me.rawHtmlToData(rawHTML)));
    })
});*/
