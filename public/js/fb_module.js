
// util functions
function getOneFeedPage(id){
	FB.api(id+"/feed", function(response) {
		console.log("~~~~~~~");
		console.log(response);
	});
}

function fetchData($scope){
	FB.api("me/friendlists", function(response) {
		var prs = [];
		for(var i in response.data){

			prs.push(accessFBAPI(response.data[i].id+'/members'));
			$scope.$apply(function() {
				$scope.feeds.push({"name" : response.data[i].name, "value" : response.data[i].id});
			});
		}
		/*
		$.when(prs).done(function(results){
			console.log(results);
			})
		*/
	});
}

function accessFBAPI(apiName){
	var dfd = $.Deferred();
	FB.api(apiName, function(response) {
		dfd.resolve(response);
	});
	return dfd.promise();
}