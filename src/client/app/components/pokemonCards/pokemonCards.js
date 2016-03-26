rootApp.directive("pokemonCards", function () {
    return {
        templateUrl: "components/pokemonCards/pokemonCards.html",
        scope: {},
        controller: function ($scope, cards, decks) {
            $scope.Cards = cards;
            $scope.Decks = decks;
        }
    };
});
