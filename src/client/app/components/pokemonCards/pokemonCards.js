rootApp.directive("pokemonCards", function () {
    return {
        templateUrl: "components/pokemonCards/pokemonCards.html",
        scope: {},
        controller: function ($scope, cards) {
			$scope.filters = {};
			$scope.filters.pageNo = 0;
			$scope.filters.perPage = 14;

			$scope.totalCards = 0;
			$scope.cards = [];
			$scope.pageCount = 0;

			$scope.$watch( function(){ return $scope.filters; }, function(filters){
				cards.get(filters).then(setCards);
			}, true);

			function setCards(cards){
				$scope.cards = cards.cards;
				$scope.totalCards = cards.results;
				$scope.pageCount = Math.ceil( cards.results / $scope.filters.perPage);
			}
        }
    };
});
