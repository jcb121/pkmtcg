rootApp.service("decks", function (webDecks, deck, $mdToast) {
  	var self = this;

	this.webDecks = webDecks;
	this.Deck = deck;
	this.decks = [];
	this.activeDeck = 0;

    /*
     * Creates an empty deck object
     */
    this.newDeck = function (name, focus) {
		if( !name) name = 'New Deck';
		var deck = new this.Deck(name, []);
		this.decks.unshift( deck );
		if(focus){
			this.setActive(0);
		}

		$mdToast.show(
	      $mdToast.simple()
	        .textContent('New Deck Created')
	        .position('top right')
	        .hideDelay(3000)
	    );

        return deck;
    };

    /*
     * Adds a global deck to the user's decks
     */
    this.addDeck = function (id, name) {
		//seachs the global decks to find the matching deck id
		var deck = false;
		if(id){
			self.webDecks.decks.forEach(function (webDeck) {
	            if (webDeck.id == id) {
	                deck = new self.Deck( webDeck.name, webDeck.cards, webDeck.id);
					self.decks.unshift( deck );
	            }
	        });
		}
        if (!deck){
			deck = this.newDeck();
		}
		return deck;
    };

    /*
     * gets the current deck DOESN@T USE ACTIVE DECK!!!
     */
    this.getDeck = function (index) {
		if (typeof index === "undefined" ){

			if( this.decks.length > 0 && this.activeDeck >= 0){
				return this.decks[this.activeDeck];
			}
			return this.newDeck();
		}
		else if( typeof this.decks[index] === "undefined" ) {
			return this.newDeck();
        }
		return this.decks[index];
    };

    /*
     * Sets the active cards for user interactions
     */
    this.setActive = function (index) {
		$mdToast.show(
	      $mdToast.simple()
	        .textContent('Active Deck Changed')
	        .position('top right')
	        .hideDelay(3000)
	    );
		this.activeDeck = index;
		return this.decks[index];
    };


    /*
     * Deletes the user deck at the index.
     */
    this.deleteDeck = function (index) {
		this.decks.splice(index, 1);
		if( this.isActive(index)  ){
			this.setActive(0);
		}
		else if(this.decks.length <= this.activeDeck){
			this.activeDeck = this.decks.length-1;
		}
    };

    /*
     * Checks if the index is the active card.
     */
    this.isActive = function (index) {
        if (this.activeDeck == index) {
            return true;
        }
        else {
            return false;
        }
    };


	/*
     * TODO: Saves the deck to the server
     */
    this.saveDeck = function (index) {
        console.log("work on saving decks");
    };
});
