rootApp.directive("cardPaginator", function () {
    return {
        transclude: false,
        require: 'ngModel',
        templateUrl: "components/paginator/paginator.html",
        scope: {
            ngModel: '=',
            pageCount: '='
        },
        controller: function ($scope) {

			$scope.buildPaginator = function(){
				$scope.pages = [];
				for( var i = 0; i < $scope.pageCount; i++){
	              $scope.pages.push(i);
	            }
			};

			$scope.next = function(){
				console.log('implement me');
			};
			$scope.prev = function(){
				console.log('implement me');
			};
			$scope.goTo = function(pageNo){
				$scope.currentPage = pageNo;
			};

        },
		link: function (scope, element, attrs, ngModel) {

        },
    };
});
