rootApp.directive("deckLoader", function () {
    return {
        transclude: true,
        templateUrl: "components/deckLoader/deckLoader.html",
        scope: {},
        controller: function ($scope, decks ) {
            $scope.Decks = decks;
        }
    };
});
