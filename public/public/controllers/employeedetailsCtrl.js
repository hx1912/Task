angular.module('app').controller('employeedetailsCtrl', employeedetailsCtrl);
function employeedetailsCtrl($scope, $http, $state, emp, tst, com){
	$scope.tst = tst;
	$scope.emp = emp;
	$scope.com = com;
	$scope.sortType = 'tst.createdOn'; 
	$scope.sortReverse  = false;
  	var refresh = function(){
		$http.get('/employee/tests/' + emp._id).then(function (succ) {
			$scope.tst = succ.data;		
		});
	}
	refresh(); 		
	$scope.back = function () {
         window.history.back();
    };	
	$scope.editemp = function (id) {
		$state.go('emp-edit',{id:id});
    };
	$scope.addtst = function (id) {
		$state.go('tst-add',{id:id});
    }; 
	$scope.tstremove = function (id){
		$http.delete('/test/' + id).then(function(succ){
		refresh();	
		});
	} 
	$scope.tstchange = function (id,result){
		if(result == "Pass")
			result = "Fail";
		else
			result = "Pass";
		var data = {			
			"result" : result,			
		}
		$http.put('/test/' + id, data).then(function(succ){			
			refresh();
		});	 
	} 
	$scope.details = function (id){
		$state.go('com-det',{id:id});
	}
};