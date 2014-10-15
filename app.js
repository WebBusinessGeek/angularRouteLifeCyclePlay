var app = angular.module('app',['ngRoute']);


//configure routes and catchall handling with otherwise
app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/',{
			template: '<h3>The view attached to the home route would be showing now</h3>'
			
		})
		.when('/regular',{
			template: '<h3>The view attached to the regular route would be showing now</h3>'
			
		})
		.when('/delayed',{
			template: '<h3>The view attached to the Delayed route would be showing now</h3>',
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
			$rootScope.$on('$routeChangeError', function(){
				console.log('error loading the route');
			})
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


			$scope.check2 = 'check2';

		}
	}
});

app.directive('regularRoute', function(){
	return{
		restrict: 'E',
		template: '<div class="col-md-4">'+
            '<button class="btn btn-success" ng-click="newView(\'/regular\')">'+
            'regular route and echo start/finish text below </button>'+
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
            '<button class="btn btn-success" ng-click="newView(\'/delayed\')">'+
            'regular route and echo start/finish text below </button>'+
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

app.directive('errorRoute', function(){
	return{
		restrict: 'E',
		template: '<div class="col-md-4">'+
            '<button class="btn btn-success" ng-click="newView(\'/error\')">'+
            'regular route and echo start/finish text below </button>'+
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
