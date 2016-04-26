rootApp.directive("pokemonCards", function () {
    return {
        templateUrl: "components/pokemonCards/pokemonCards.html",
        scope: {},
        controller: function ($scope, cards) {
            $scope.Cards = cards;
        }
    };
});
