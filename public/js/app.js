
var fbFeedApp = angular.module('fbFeedApp',
 ['ngRoute', 'listFeedControllers']);

fbFeedApp.config([
	'$routeProvider', function($routeProvider){
		$routeProvider.when('/partials/haha', {
			templateUrl : '/partials/haha.html',
			controller : 'haha'
		}).when('/partials/lala', {
			templateUrl : '/partials/lala.html',
			controller : 'lala'
		}).otherwise({
			redirectTo : '/partials/haha'
		});
	}
]);