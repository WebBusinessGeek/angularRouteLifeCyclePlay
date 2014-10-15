var app = angular.module('app',['ngRoute']);


//configure routes and catchall handling with otherwise
app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/',{
			template:'<h4>The view attached to the </h4>'+
					'<h2>Root route</h2>'+
					'<h4>would be showing now</h4>'
			
		})
		.when('/regular',{
			template: '<h4>The view attached to the </h4>'+
					'<h2>Regular route</h2>'+
					'<h4>would be showing now</h4>'
					
			
		})
		.when('/delayed',{
			template:  '<h4>The view attached to the </h4>'+
					'<h2>Delayed route</h2>'+
					'<h4>would be showing now</h4>',
			//to make the route delay
			resolve: {
				delay: function($q, $timeout){
					var defer = $q.defer();

					$timeout(function(){
						defer.resolve();
					}, 3000);

					return defer.promise;
				}
			}
			
		})
		.when('/error', {
			template: 'This view will never show as the route will never resolve',
			
			//to make the route never resolve we are using reject() on the deferred object
			resolve: {

				error: function($q, $timeout){
					var defer = $q.defer();

					$timeout(function(){
						defer.reject();
					}, 300);

					return defer.promise;	

				}
			}
			
		})
		.otherwise({
			redirectTo: '/'
		});
})



//checks if route is changing and alerts status in the console
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
			$rootScope.$on('$routeChangeError', function(){
				console.log('error loading the route');
			})
		}
		
	}
})

//for the routing function to be passed to the button directives
app.directive('routerLogic', function(){
	return{
		controller: function($scope, $location, $rootScope,$q, $timeout){
			$scope.newView = function(arg){
				$location.path(arg);
				
			}



		}
	}
});

app.directive('regularRoute', function(){
	return{
		restrict: 'E',
		template: '<div class="col-md-4">'+
            '<button class="btn btn-success" ng-click="newView(\'/regular\')">'+
            'Click to activate the Regular route</button>'+
        	'</div>'
	}
})


app.directive('delayedRoute', function(){
	return{
		restrict: 'E',
		template: '<div class="col-md-4">'+
            '<button class="btn btn-warning" ng-click="newView(\'/delayed\')">'+
            'Click to activate the Delayed route</button>'+
        	'</div>'
	}
})

app.directive('errorRoute', function(){
	return{
		restrict: 'E',
		template: '<div class="col-md-4">'+
            '<button class="btn btn-danger" ng-click="newView(\'/error\')">'+
            'Click to activate the Error route </button>'+
        	'</div>'
       
	}
})

app.directive('rootRoute', function(){
	return{
		restrict: 'E',
		template: '<div class="col-md-4">'+
            '<button class="btn btn-default" ng-click="newView(\'/\')">'+
            'Click to return to the Route route </button>'+
        	'</div>'
	}
})
