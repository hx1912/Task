angular.module('app').controller('testCtrl', testCtrl);
function testCtrl($scope, $http, $state){
	$scope.sortType     = 'tst.createdOn'; 
	$scope.sortReverse  = false;	
	var refresh = function()
		{
		   $http.get('/tests').then(function (succ) {
			$scope.tst = succ.data;			
		});
	}
	refresh();
	$scope.empdetails = function (id)
		{
			$state.go('emp-det',{id:id});
		}
	$scope.back = function () {
         window.history.back();
    };	
	$('input[name="daterange"]').daterangepicker({
		opens: 'left',
		showDropdowns: true,
		minYear: 2000,		
	}, function(start, end, label) {   
		var range = {
			start: start.toISOString(),
			end: end.toISOString()
		}	
	   $http.post('/test/range',range).then(function (succ) {
			$scope.tst = succ.data;				
		});
	});
};