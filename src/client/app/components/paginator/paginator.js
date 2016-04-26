rootApp.directive("cardPaginator", function () {
    return {
        transclude: false,
        require: [],
        templateUrl: "components/paginator/paginator.html",
        scope: {
            fetch: '=',
            current: '=',
            pageCount: '='
        },
        controller: function ($scope) {

            $scope.pages = [];
            for( var i = 0; i < $scope.pageCount; i++){
              $scope.pages.push(i);
            }

			$scope.next = function(){
				console.log('implement me');
			};
			$scope.prev = function(){
				console.log('implement me');
			};
			$scope.goTo = function(){
				console.log('implement me');
			};

        },
        link: function (scope, element, attrs, ngModel) {

        }
    };
});
