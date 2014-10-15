var app = angular.module('app',['ngRoute']);


//configure routes and catchall handling with otherwise
app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/',{
			template: 'this is the home page'
			
		})
		.when('/regular',{
			template: 'this is the regular route'
			
		})
		.when('/delayed',{
			template: 'this is the delayed route'
			
		})
		.when('/error', {
			template: 'this is the error route'
			
		})
		.otherwise({
			redirectTo: '/'
		});
})



//checks if route is changing and alerts when change is complete
app.directive('routeDirective', function(){
	return{
		restrict: 'A',
		controller: function($scope, $location, $rootScope){
			$rootScope.$on('$routeChangeStart', function(){
				$scope.finish = '';
				console.log('the route is starting to change');
				$scope.changing = 'Scope is changing';


			});
			$rootScope.$on('$routeChangeSuccess', function(){
				$scope.changing = '';
				console.log('the route is done changing');
				$scope.finish = 'Scope is finished';
				
			});
		}
		
	}
})


app.directive('someController', function(){
	return{
		controller: function($scope, $location, $rootScope,$q, $timeout){
			$scope.check = '';

			$scope.newView = function(arg){
				$location.path(arg);
				$scope.check = arg;
			}

			$scope.delayedView = function(arg){
				var defer = $q.defer();


				$timeout(function(){
					defer.resolve($location.path(arg));
					
				}, 3000);

				
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
            'regular route and echo start/finish text below </button>{{changing}}{{finish}}'+
        	'</div>',
       require: '^someController',
		link: function(scope, element, attrs, someController){
			element.bind('click',function(){
				if(scope.check == '/regular'){
					console.log('its equal');
				}else{
					console.log('not equal');
				}
			});
		}
	}
})


app.directive('delayedRoute', function(){
	return{
		restrict: 'E',
		template: '<div class="col-md-4">'+
            '<button class="btn btn-success" ng-click="delayedView(\'/delayed\')">'+
            'regular route and echo start/finish text below </button>{{changing}}{{finish}}'+
        	'</div>',
       require: '^someController',
		link: function(scope, element, attrs, someController){
			element.bind('click',function(){
				if(scope.check == '/delayed'){
					console.log('its equal');
				}else{
					console.log('not equal');
				}
			});
		}
	}
})
