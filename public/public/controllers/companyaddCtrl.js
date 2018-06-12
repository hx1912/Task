angular.module('app').controller('companyaddCtrl', companyaddCtrl);
function companyaddCtrl($scope, $http, $state){
	$scope.back = function () {
        window.history.back();
    };	  
	$scope.addCom = function (){	
		$http.post('/add/company', $scope.com).then(function (succ) {
			if(succ.data!=""){
				$scope.com = {};	
				$('#myModal').modal('toggle');	
			}
			else
				$('#myModalfail').modal('toggle');	
		});
	}
	$scope.clear = function () {
		$scope.com = {};
    };	 
};