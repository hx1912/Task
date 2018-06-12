angular.module('app').controller('companyCtrl', companyCtrl);
function companyCtrl($scope, $http, $state){	
	var refresh = function(){
		$http.get('/companies').then(function (succ) {
			$scope.com = succ.data;		
		});
	}
	refresh();
	$scope.details = function (id){
		$state.go('com-det',{id:id});
	}
	$scope.remove = function (id){
		$http.delete('/company/' + id).then(function(succ){
			refresh();	
		});
	}
	$scope.back = function () {
        window.history.back();
    };
};