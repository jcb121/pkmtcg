/**
 * @ngdoc service
 * @name rootApp.service:deck
 * @description
 * returns a deck object constructor with multiple methods for managing cards <br>
 <pre>var deck = new deck('newDeck', cards, 55);</pre>
 * @param {string} name The name of the new deck
 * @param {object} cards cards cards object
 * @param {int} id id of the new deck
 * @returns {object} a deck object constructor
 */
rootApp.service("deck", function(userMessages){


	var deckObject = function(name, cards, id){
		this.name = name;
		this.cards = cards;
		this.id = id;

		this.addCard = addCard;
		this.addCards = addCards;
		this.removeCard = removeCard;
		this.deleteCard = deleteCard;
		this.indexOfCard = indexOfCard;
		this.quantityOfCard = quantityOfCard;
		this.totalCards = totalCards;
	};
	return deckObject;

	/**
	* @ngdoc method
	* @name addCards
	* @methodOf rootApp.service:deck
	* @description
	* Takes a cards object and adds it to the Deck object
	* @param {object} cards cards object
	* @returns {this} returns itself for chaining
	*/
	function addCards(cards){
		cards.forEach(function(card){
			addCard(card.id, card.quantity);
		});
	}

	/**
	* @ngdoc method
	* @name addCard
	* @methodOf rootApp.service:deck
	* @description
	* Adds a card to the Deck object using an id
	* @param {int} id  id of the card
	* @param {int} quantity cards object
	* @returns {this} returns itself for chaining
	*/
	function addCard(id, quantity){
		var index = this.indexOfCard(id);
		quantity = angular.isDefined(quantity)?quantity:1;

		if (index !== false) {
			this.cards[index].quantity += quantity;
			userMessages.toast("Card quantity increased");
		}
		else {
			this.cards.push({ id: id, quantity: quantity });
			userMessages.toast("Card Add to deck");
		}
		return this;
	}

	/**
	* @ngdoc method
	* @name removeCard
	* @methodOf rootApp.service:deck
	* @description
	* Decrements a card from the Deck object <br/>
	* If it's the last card, the card is removed
	* @param {int} id  id of the card
	*/
	function removeCard(id){
		var index = this.indexOfCard(id);
		if (this.cards[index].quantity <= 1) {
			this.deleteCard(id);
			userMessages.toast("Card removed from deck");
		}
		else {
			this.cards[index].quantity--;
			userMessages.toast("Card quantity decreased");
		}
	}

	/**
	* @ngdoc method
	* @name deleteCard
	* @methodOf rootApp.service:deck
	* @description
	* Removes a card from the Deck object
	* @param {int} id  id of the card
	*/
	function deleteCard(id){
		var index = this.indexOfCard(id);
		if(index){
			this.cards.splice(index, 1);
		}
	}

	/**
	* @ngdoc method
	* @name indexOfCard
	* @methodOf rootApp.service:deck
	* @description
	* gets the index of the card from the Deck object's cards array
	* @param {int} id  id of the card
	* @returns {int} index of the chosen card
	*/
	function indexOfCard(id){
		var deepCheck = false;
		this.cards.forEach(function (deckCard, index) {
			if (deckCard.id == id) deepCheck = index;
		});
		return deepCheck;
	}

	/**
	* @ngdoc method
	* @name quantityOfCard
	* @methodOf rootApp.service:deck
	* @description
	* return the quantity of the card in the Decj object
	* @param {int} id  id of the card
	* @returns {int} quantity of the chosen card
	*/
	function quantityOfCard(id){
		var index = this.indexOfCard(id);
		return this.cards[index].quantity;
	}

	/**
	* @ngdoc method
	* @name totalCards
	* @methodOf rootApp.service:deck
	* @description
	* counts the total number of cards in the deck
	* @returns {int} total cards in the Deck object
	*/
	function totalCards(){
		var cardCount = 0;
		this.cards.forEach(function (card) {
		 cardCount += card.quantity;
		});
		return cardCount;
	}
});
