
// util functions
function getOneFeedPage(id){
	FB.api(id+"/feed", function(response) {
		console.log("~~~~~~~");
		console.log(response);
	});
}

function fetchData($scope){
	FB.api("me/friendlists", function(response) {
		console.log("~~~~  data   ~~~");
		var prs = [];
		for(var i in response.data){
			$scope.$apply(function() {
				$scope.feeds.push({"name" : response.data[i].name, "value" : response.data[i].id});
			});
		}
	});
}

function accessFBAPI(apiName){
	var dfd = $.Deferred();
	FB.api(apiName, function(response) {
		dfd.resolve(response);
	});
	return dfd.promise();
}