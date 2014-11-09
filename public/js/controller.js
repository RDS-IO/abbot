
var fbFeedApp = angular.module('fbFeedApp', []);

fbFeedApp.controller('listFeed', function ($scope) {
	console.log("on the go");
	$scope.feeds = [
		{'name': 'Init Fake data',
		'value': 'App is running.....'}
	];
	$scope.update = function(){
		$scope.feeds[0].name = 'lwpelfwpe';
	}
});