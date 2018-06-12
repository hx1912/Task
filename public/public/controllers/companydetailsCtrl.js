angular.module('app').controller('companydetailsCtrl', companydetailsCtrl);
function companydetailsCtrl($scope, $http, $state, com, emp){
	$scope.com = com;
	$scope.emp = emp;
	$scope.search   = '';
  	var refresh = function(){
		$http.get('/company/employees/' + com._id).then(function (succ) {
			$scope.emp = succ.data;		
		});
	}
	refresh();
	$scope.back = function () {
         window.history.back();
    };	
	$scope.edit = function (id) {
		$state.go('com-edit',{id:id});
    };
	$scope.pass = function (id) {
		$http.get('/company/pass/' + com._id).then(function (succ) {
			$scope.pass = succ.data;		
		});
    };
	$scope.addemp = function (id) {
		$state.go('emp-add',{id:id});
    }; 
	$scope.empdetails = function (id) {
		$state.go('emp-det',{id:id});
    }; 
	$scope.empremove = function (id){
		$http.delete('/employee/' + id).then(function(succ){
			refresh();	
		});
	}
};	
angular.module('app').filter('tableFilter', tableFilter);
function tableFilter() {   
    return function (dataArray, searchTerm) {     
        if (!dataArray) {
            return;
        }      
        else if (!searchTerm) {
            return dataArray;
        }      
        else {           
            var term = searchTerm.toLowerCase();         
            return dataArray.filter(function (object) {
                var termInFirstName = object.firstname.toLowerCase().indexOf(term) > -1;
                var termInLastName = object.lastname.toLowerCase().indexOf(term) > -1;
                return termInFirstName || termInLastName;
            });
        }
    }
}
	
	
	
	
	
	
	
