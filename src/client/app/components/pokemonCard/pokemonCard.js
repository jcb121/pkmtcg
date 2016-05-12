rootApp.directive("pokemonCard", function () {
    return {
        transclude: true,
        templateUrl: "components/pokemonCard/pokemonCard.html",
        scope: {
            data: "=",
            deck: "=",
            id: "="
        },
        controller: function ($scope, markedCards, cards, decks, $state ) {
            $scope.MarkedCards = markedCards;
            $scope.Cards = cards;
            $scope.Decks = decks;

			if (typeof $scope.data === "undefined") {
                $scope.Cards.getById($scope.id).then(function(card){
					$scope.card = card;
				});
            }else{
				$scope.card = $scope.data;
			}

			$scope.goToCardView = function(){
				$state.go("cardView", {cardId:$scope.card.id});
			};
        }
    };
});
