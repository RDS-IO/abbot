

var listFeedControllers = angular.module('listFeedControllers', []);

listFeedControllers.controller('haha', function ($scope) {
	$.when(FBinitDef).done(function(){
		FB.api("me/friendlists", function(response) {
			$scope.$apply(function(){
				for(var i in response.data){
					$scope.feeds.push({"name" : response.data[i].name, "value" : response.data[i].id});
				}
			});
		});
	})
	//init value
	$scope.feeds = [{'name' : 'init list', 'value' : 'no content'}];
});

listFeedControllers.controller('lala', function ($scope) {
	console.log("controller : lala");
});

listFeedControllers.controller('listFeed', function ($scope) {
	console.log("controller : listFeed");
	
});