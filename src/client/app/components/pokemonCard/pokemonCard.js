rootApp.directive("pokemonCard", function () {
    return {
        transclude: true,
        templateUrl: "components/pokemonCard/pokemonCard.html",
        scope: {
            data: "=",
            deck: "=",
            id: "="
        },
        controller: function ($scope, markedCards, activeCard, cards, decks, typeChecker ) {

            $scope.MarkedCards = markedCards;
            $scope.ActiveCard = activeCard;
            $scope.Cards = cards;
            $scope.Decks = decks;
            $scope.TypeChecker = typeChecker;


            $scope.card = $scope.data;

			if (typeof $scope.data === "undefined") {
                $scope.Cards.get({ id: $scope.id }, false, function (response) {
                    $scope.card = response.data[0];
                });
            }

        },
        link: function (scope, element, attrs, ngModel) {
            element.find("img").on("load", function () {
                scope.imgReady = true;
                scope.$apply();
            });
        }
    };
});
