var app = angular.module('app',['ngRoute']);


//configure routes and catchall handling with otherwise
app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/',{
			template: 'this is the home page',
			controller:'routeController'
		})
		.when('/regular',{
			template: 'this is the regular route',
			controller: 'routeController'
		})
		.when('/delayed',{
			template: 'this is the delayed route',
			controller: 'routeController'
		})
		.when('/error', {
			template: 'this is the error route',
			controller: 'routeController'
		})
		.otherwise({
			redirectTo: '/'
		});
})


//check if route is changing and alerts when change is complete
// app.controller('routeController', function($scope, $rootScope){
// 	$rootScope.$on('$routeChangeStart', function(){
// 		console.log('the route is starting to change');
// 	})
// 	$rootScope.$on('$routeChangeSuccess', function(){
// 		console.log('the route is done changing');
// 	})
// })


app.directive('routeDirective', function(){
	return{
		restrict: 'A',
		controller: function($scope, $location, $rootScope){
			$rootScope.$on('$routeChangeStart', function(){
				console.log('the route is starting to change');
			});
			$rootScope.$on('$routeChangeSuccess', function(){
				console.log('the route is done changing');
			});
		},
		controllerAs: 'routeController'
	}
})


app.directive('someController', function(){
	return{
		controller: function($scope, $location, $rootScope){
			$scope.check = '';

			$scope.newView = function(arg){
				$location.path(arg);
				$scope.check = arg;
			}

			$scope.check2 = 'check2';

		}
	}
});

app.directive('regularRoute', function(){
	return{
		restrict: 'E',
		template: '<div class="col-md-4">'+
            '<button class="btn btn-success" ng-click="newView(\'/regular\')">'+
            'regular route and echo start/finish text below </button>{{check}}'+
        	'</div>',
       require: '^someController',
		link: function(scope, element, attrs, someController){
			// element.bind('click',function(){
			// 	if(scope.check == '/regular'){
			// 		console.log('its equal');
			// 	}else{
			// 		consloe.log('not equal');
			// 	}
			// });
		}
	}
})
