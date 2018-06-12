angular.module('app').controller('employeeeditCtrl', employeeeditCtrl);
function employeeeditCtrl($scope, $http, $state, emp){
	$scope.emp = emp; 		
	var res = emp.firstname.concat(" ",emp.lastname);
	$scope.empname = res; 
	$scope.back = function () {
		window.history.back();
    };
	$scope.clear = function () {
        $scope.emp = {};
    }	
	$scope.update = function() {
		$http.put('/employee/' + $scope.emp._id, $scope.emp).then(function(succ)
		{			
			window.history.back();
		});		
	} 
};