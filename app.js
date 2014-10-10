var app = angular.module('app',['ngRoute']);


app.config(function($routeProvider){
	$routeProvider
		.when('/hey', 
		{
			template: 'This is a template',
			controller: 'someController'
		})
		.otherwise({
			redirectTo: '/hey',
		});
})




app.controller('someController', function($scope){
	$scope.stuff = 'Some stuff';
})