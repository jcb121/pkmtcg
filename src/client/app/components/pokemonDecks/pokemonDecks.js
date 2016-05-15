rootApp.directive("pokemonDecks", function () {
    return {
        templateUrl: "components/pokemonDecks/pokemonDecks.html",
        scope: {},
        controller: function ($scope, decks, serverSession) {
			$scope.Decks = decks;
			$scope.serverSession = serverSession;
			
			$scope.addCard = function(id){
				var index = this.indexOfCard(id);
				if (index !== false) {
					this.cards[index].quantity++;
				}
				else {
					this.cards.push({ id: id, quantity: 1 });
				}
				return this;
			};

			$scope.removeCard = function(id){
				var index = this.indexOfCard(id);
				if (this.cards[index].quantity <= 1) {
					this.deleteCard(id);
				}
				else {
					this.cards[index].quantity--;
				}
			};

			$scope.deleteCard = function(id){
				var index = this.indexOfCard(id);
				if(index){
					this.cards.splice(index, 1);
				}
			};

			$scope.indexOfCard = function(id){
				var deepCheck = false;
				this.cards.forEach(function (deckCard, index) {
					if (deckCard.id == id) deepCheck = index;
				});
				return deepCheck;
			};

			$scope.quantityOfCard = function (id){
				var index = this.indexOfCard(id);
				return this.cards[index].quantity;
			};

			$scope.totalCards = function(){
				var cardCount = 0;
				this.cards.forEach(function (card) {
				 cardCount += card.quantity;
				});
				return cardCount;
			};
        }
    };
});
