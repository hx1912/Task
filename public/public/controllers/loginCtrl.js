angular.module('app').controller('loginCtrl', loginCtrl);
function loginCtrl($scope, $http, $state){
	$('#but').hide();
	localStorage.clear();
	$scope.back = function () {
        window.history.back();
    };	  
	$scope.login = function ()
	{	
		$http.post('/user', $scope.user).then(function (succ) {
			if(succ.data!= null){
				localStorage.setItem("username", succ.data.username);
				$state.go('home');				
			}
			else				
				$('#myModal').modal('toggle');			
		});
	}
};