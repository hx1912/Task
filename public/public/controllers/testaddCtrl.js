angular.module('app').controller('testaddCtrl', testaddCtrl);
function testaddCtrl($scope, $http, $state, emp){
	$scope.emp = emp;
	$scope.back = function () {
         window.history.back();
    };	  
	$scope.addtest = function (){	
		$http.post('/add/test' , $scope.tst).then(function (succ) {
			if(succ.data!=""){
				 $scope.tst.name = "";
				 $scope.tst.result = "";
				 $('#myModal').modal('toggle');	
			}
		});
	}
	$scope.clear = function () {
		$scope.tst.name = "";
		$scope.tst.result = "";
	};	 
};