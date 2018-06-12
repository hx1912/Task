angular.module('app').controller('employeeaddCtrl', employeeaddCtrl);
function employeeaddCtrl($scope, $http, $state, com){
	$scope.com = com;
	$scope.back = function () {
         window.history.back();
    };	  
	$scope.addemployee = function (){	
		$http.post('/add/employee' , $scope.emp).then(function (succ) {
			if(succ.data!=""){
				$scope.emp.firstname = "";
				$scope.emp.lastname = "";
				$scope.emp.city = "";
				$scope.emp.number = "";
				$('#myModal').modal('toggle');	
			}
		});
	}
	$scope.clear = function () {
		$scope.emp.firstname = "";
		$scope.emp.lastname = "";
		$scope.emp.city = "";
		$scope.emp.number = "";
	};	 
};