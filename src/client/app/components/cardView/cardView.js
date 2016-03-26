rootApp.directive("cardView", function () {
    return {
        transclude: true,
        require: [],
        templateUrl: "components/cardView/cardView.html",
        scope: {},
        controller: function ($scope, activeCard ) {
            $scope.activeCard = activeCard;
        },
        link: function (scope, element, attrs, ngModel) {

        }
    };
});
