rootApp.directive("pokemonDecks", function () {
    return {
        templateUrl: "components/pokemonDecks/pokemonDecks.html",
        scope: {},
        controller: function ($scope, decks) {
            $scope.Decks = decks;
        }
    };
});
