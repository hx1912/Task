angular.module('app').controller('companyeditCtrl', companyeditCtrl);
function companyeditCtrl($scope, $http, $state, com){
	$scope.com = com;
  	$scope.compname = com.name; 
	$scope.back = function () {
         window.history.back();
    };
	$scope.clear = function () {
        $scope.com = {};
    }	
	$scope.update = function() {
		$http.put('/company/' + $scope.com._id, $scope.com).then(function(succ)
		{			
			window.history.back();
		});		
	}
};