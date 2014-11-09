
var allFriendsId = [];

// util functions
function getOnePage(id){
	FB.api(id+"/feed", function(response) {
		console.log("~~~~~~~");
		console.log(response);
	});
}

function fetchData(url){
	FB.api(url, function(response) {
		console.log("~~~~  data   ~~~");
		console.log(JSON.stringify(response));
	});
}

function accessFBAPI(apiName){
				var dfd = $.Deferred();
				FB.api(apiName, function(response) {
					dfd.resolve(response);
				});
				return dfd.promise();
			}
//main function, execute when load

function testAPI() {
	accessFBAPI('/me/friendlists').then(function(list){
		var promises = [];
		for(var i in list.data){
			promises.push(accessFBAPI(list.data[i].id + '/members').
				done(function(result){
					
			}));
		}
		return $.when.apply(undefined, promises).promise();
	}).then(function(){
		console.log("done!");
	});			
}

