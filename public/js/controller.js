

var listFeedControllers = angular.module('listFeedControllers', []);


listFeedControllers.controller('haha', function ($scope) {
	console.log("controller : haha");
	$scope.feeds = [{'name' : 'lalala', 'value' : 'akkkaka'}];
});

listFeedControllers.controller('lala', function ($scope) {
	console.log("controller : lala");
});

listFeedControllers.controller('listFeed', function ($scope) {
	console.log("controller : listFeed");
	
});