"use strict";
angular
  .module('app', [
    'ui.router' , 'ui.router.state.events'
  ])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html', 
		controller: 'homeCtrl'
      })
	   .state('login', {
        url: '/',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })	  
       .state('company', {
        url: '/company',
        templateUrl: 'templates/company.html',
        controller: 'companyCtrl'
      })	  
	  .state('test', {
        url: '/test',
        templateUrl: 'templates/test.html',
		controller: 'testCtrl'
      }) 
	  .state('com-add', {
        url: '/company/add',
        templateUrl: 'templates/addcompany.html',
		controller: 'companyaddCtrl'
      }) 
	   .state('emp-add', {
        url: '/employee/add/:id',
        templateUrl: 'templates/addemployee.html',
		controller: 'employeeaddCtrl',
		resolve: {
			com: function($rootScope, $http, $stateParams, $q) {
					return  $http.get('/company/' + $stateParams.id).then(function(succ)
					{
						return succ.data;			
					});	
				},
			}
      }) 
	   .state('tst-add', {
        url: '/test/add/:id',
        templateUrl: 'templates/addtest.html',
		controller: 'testaddCtrl',
		resolve: {
			emp: function($rootScope, $http, $stateParams, $q) {
					return  $http.get('/employee/' + $stateParams.id).then(function(succ)
					{
						return succ.data;			
					});	
				},
			}
      }) 
	    .state('com-det', {
        url: '/company/:id',
        templateUrl: 'templates/detailcompany.html',
		controller: 'companydetailsCtrl',
		resolve: {
			com: function($rootScope, $http, $stateParams, $q) {
					return  $http.get('/company/' + $stateParams.id).then(function(succ)
					{
						return succ.data;			
					});	
				},
			emp: function($rootScope, $http, $stateParams, $q) {
					return  $http.get('/company/employees/' + $stateParams.id).then(function(succ)
					{
						return succ.data;			
					});	
				},
			}
      }) 
	    .state('emp-det', {
        url: '/employee/:id',
        templateUrl: 'templates/detailemployee.html',
		controller: 'employeedetailsCtrl',
		resolve: {
			emp: function($rootScope, $http, $stateParams, $q) {
					return  $http.get('/employee/' + $stateParams.id).then(function(succ)
					{
						return succ.data;			
					});	
				},
			tst: function($rootScope, $http, $stateParams, $q) {
					return  $http.get('/employee/tests/' + $stateParams.id).then(function(succ)
					{
						return succ.data;			
					});	
				}, 
			com: function($rootScope, $http, $stateParams, $q) {
					return  $http.get('/employee/company/' + $stateParams.id).then(function(succ)
					{
						return succ.data;			
					});	
				}, 
			}
      }) 
	    .state('com-edit', {
        url: '/company/edit/:id',
        templateUrl: 'templates/editcompany.html',
		controller: 'companyeditCtrl',
		resolve: {
			com: function($rootScope, $http, $stateParams, $q) {
					return  $http.get('/company/' + $stateParams.id).then(function(succ)
					{
						return succ.data;
					});	
				},
			}
      }) 
	   .state('emp-edit', {
        url: '/employee/edit/:id',
        templateUrl: 'templates/editemployee.html',
		controller: 'employeeeditCtrl',
		resolve: {
			emp: function($rootScope, $http, $stateParams, $q) {
					return  $http.get('/employee/' + $stateParams.id).then(function(succ)
					{
						return succ.data;
					});	
				},
			}
      }) 
  }])
  .run(function ($rootScope
    ,$state, $stateParams, $window, $http) {	 
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
	$rootScope.$on(
        '$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            var user = localStorage.getItem("username");				
			if(user===null && toState.name != 'login'){
				$state.go('login');	
				//event.preventDefault();
			}
			
        }
    ); 
});


