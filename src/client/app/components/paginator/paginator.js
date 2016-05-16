rootApp.directive("cardPaginator", function () {
    return {
        transclude: false,
        require: 'ngModel',
        templateUrl: "components/paginator/paginator.html",
        scope: {
			pageNo: '=?',
            pageCount: '='
        },
        controller: function ($scope) {

			$scope.$watch(function(){
				return $scope.pageCount;
			}, function(val){
				buildPaginator(val);
			});

			function buildPaginator(count){
				$scope.pages = [];
				for( var i = 0; i < count; i++){
	              $scope.pages.push(i);
	            }
			}

			$scope.next = function(){
				if($scope.pageNo < $scope.pageCount -1 ){
					$scope.pageNo++;
				}

			};
			$scope.prev = function(){
				if($scope.pageNo >= 1){
					$scope.pageNo--;
				}
			};
			$scope.goTo = function(pageNo){
				$scope.pageNo = pageNo;
			};
        },
    };
});
