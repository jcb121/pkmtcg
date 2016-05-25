rootApp.directive("deckLoader", function () {
    return {
        transclude: true,
        templateUrl: "components/deckLoader/deckLoader.html",
        scope: {},
        controller: function ($scope, decks, users ) {
			console.log(decks);
			$scope.Decks = decks;

			if(users.user_id){
				decks.get({user_id:users.user_id}).then(function(decks){
					$scope.userDecks = decks;
				});
			}else{
				$scope.userDecks = [{name:"Create a deck"}];
			}

			decks.get().then(function(decks){
				$scope.decks = decks;
			});
        }
    };
});
