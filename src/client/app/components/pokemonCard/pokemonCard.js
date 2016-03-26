rootApp.directive("pokemonCard", function () {
    return {
        transclude: true,
        require: [],
        templateUrl: "components/pokemonCard/pokemonCard.html",
        scope: {
            data: "=",
            deck: "=",
            id: "=",
        },
        controller: function ($scope, markedCards, activeCard, cards, decks, typeChecker ) {

            if (typeof $scope.data === "undefined") {

                cards.load({ id: $scope.id }, function (response) {
                    $scope.data = response.data[0];
                });

            }

            $scope.markedCards = markedCards;
            $scope.activeCard = activeCard;
            $scope.cards = cards;
            $scope.decks = decks;
            $scope.typeCheckerService = typeChecker;

            $scope.card = $scope.data;

        },
        link: function (scope, element, attrs, ngModel) {

            element.find("img").on("load", function () {
                scope.imgReady = true;
                scope.$apply();
            });

        }
    };
});
