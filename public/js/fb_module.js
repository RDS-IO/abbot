
// execute this immediately
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
	FB.init({
		appId      : '1467072543528237',
		status     : true,
		xfbml      : true
	});
	FB.Event.subscribe('auth.authResponseChange', function(response) {						
		if(response.status === 'not_authorized'){
			FB.login();
		}else if(response.status === 'connected'){
			var $scope = angular.element($('#fb-root')).scope();
			fetchData($scope);
		}else{
			FB.login();
		}
	});				
};

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