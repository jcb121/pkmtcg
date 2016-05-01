rootApp.service("deck", function(){
	var deckObject = function(name, cards, id){
		this.name = name;
		this.cards = cards;
		this.id = id;

		this.addCard = addCard;
		this.removeCard = removeCard;
		this.deleteCard = deleteCard;
		this.indexOfCard = indexOfCard;
		this.quantityOfCard = quantityOfCard;
		this.totalCards = totalCards;
	};
	return deckObject;

	function addCard(id){
		var index = this.indexOfCard(id);
		if (index !== false) {
			this.cards[index].quantity++;
		}
		else {
			this.cards.push({ id: id, quantity: 1 });
		}
		return this;
	}

	function removeCard(id){
		var index = this.indexOfCard(id);
		if (this.cards[index].quantity <= 1) {
			this.deleteCard(id);
		}
		else {
			this.cards[index].quantity--;
		}
	}

	function deleteCard(id){
		var index = this.indexOfCard(id);
		if(index){
			this.cards.splice(index, 1);
		}
	}

	function indexOfCard(id){
		var deepCheck = false;
		this.cards.forEach(function (deckCard, index) {
			if (deckCard.id == id) deepCheck = index;
		});
		return deepCheck;
	}

	function quantityOfCard(id){
		var index = this.indexOfCard(id);
		return this.cards[index].quantity;
	}

	function totalCards(){
		var cardCount = 0;
		this.cards.forEach(function (card) {
		 cardCount += card.quantity;
		});
		return cardCount;
	}
});
