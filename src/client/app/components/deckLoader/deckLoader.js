rootApp.directive("deckLoader", function () {
    return {
        transclude: true,
        templateUrl: "components/deckLoader/deckLoader.html",
        scope: {},
        controller: function ($scope, decks, users ) {
			$scope.Decks = decks;

			decks.get({user_id:users.user_id}).then(function(decks){
				$scope.userDecks = decks;
			});
			decks.get().then(function(decks){
				$scope.decks = decks;
			});
        }
    };
});
