rootApp.directive("deckLoader", function () {
    return {
        transclude: true,
        templateUrl: "components/deckLoader/deckLoader.html",
        scope: {},
        controller: function ($scope, decks ) {
            $scope.decks = decks;
        },
        link: function (scope, element, attrs, ngModel) {



        }
    };
});
