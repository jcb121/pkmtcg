rootApp.service("decks", function ($http, cards) {
    var self = this;

    //Users decks
    this.decks = [];
    this.deck = false;

    this.activeDeck = 0;

    //Global Decks
    this.globalDecks = [];
    this.globalDeckNames = []; //used for autocomplete only.

    /*
     * loads an array of decks each holding ids
     */
    this.get = function(callback){
        $http.get("http://pkm.52webdesigns.com/rest/decks.php").then(function (response) {

            self.globalDecks = response.data;

            //builds out the deck object.
            response.data.forEach(function (deck, index) {
                var tempCards = JSON.parse(deck.cards);
                deck.cards = [];
                tempCards.forEach(function (item) {
                    deck.cards.push({ id: item[0], quantity: item[1] });
                });
            });

            //used for autocomplete only.
            response.data.forEach(function (deck, index) {
                self.globalDeckNames.push(deck.name);
            });

            if( angular.isFunction(callback) ){
                callback(response);
            }
        });

        return this;
    };

    this.get();

    /*====================================  DECK RELATED FUNCTIONS  ===============================================*/


    /*
     * Creates an empty deck object
     */
    this.newDeck = function () {

        this.addDeck("New Deck");
        this.setActive(0);
        //this.deck = this.decks[0];
    };

    /*
     * Adds a global deck to the user's decks
     */
    this.addDeck = function (name) {

        //Hold the deck from the global decks
        var globalDeckFound = false;

        //seachs the global decks to find the matching deck to the name
        self.globalDecks.forEach(function (globalDeck, index) {
            if (globalDeck.name == name) {

                //If the name matches, it clones the deck
                globalDeckFound = angular.copy(globalDeck);
            }
        });

        if (!globalDeckFound) globalDeckFound = { name: "New Deck", cards: [] };

        //Is a check if the user Doesn't have the deck already
        var newDecktoUser = true;

        //Searches the user deck if it already contains the new deck
        self.decks.forEach(function (userDecks, index) {
            if (userDecks.name == globalDeckFound.name) {
                //If it matches
                newDecktoUser = false;
            }
        });

        if (newDecktoUser) {
            self.decks.unshift(globalDeckFound);
        }
    };

    /*
     * gets the current deck used for a chaining;
     */
    this.getDeck = function (index) {

        //No Deck set as index is not set
        if (typeof index === "undefined") {
            this.deck = false;
            return this;
        }

        //
        if (typeof this.decks[index] === "undefined") {
            this.decks[index] = {
                name: "New Deck",
                cards: []
            };
        }

        this.deck = this.decks[index];
        return this;
    };

    /*
     * TODO: Saves the deck to the serber
     */
    this.saveDeck = function (index) {
        console.log("work on saving decks");
    };

    /*
     * Sets the active cards for user interactions
     */
    this.setActive = function (index) {
        this.activeDeck = index;
    };

    /*
     * Deletes the user deck at the index.
     */
    this.deleteDeck = function (index) {
        if( this.deck === this.decks.index ) this.deck = false;
        this.decks.splice(index, 1);

        if( this.activeDeck == index) this.activeDeck = 0;
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
     * Delete The Current Deck
     */
    this.deleteCurrentDeck = function () {
        var index = this.decks.indexOf(this.deck);
        this.deleteDeck(index);
    };

    /*====================================  Card RELATED FUNCTIONS  ===============================================*/

    /*
     * Adds a card to the current deck
     */
    this.add = function (id) {

        if (typeof id === "object") id = id.id;

        var index = this.indexOf(id);

        if (index !== false) {
            this.deck.cards[index].quantity++;
        }
        else {
            this.deck.cards.push({ id: id, quantity: 1 });
        }

        return this;
    };

    /*
     * Gets the index of the card from the current deck
     */
    this.indexOf = function (id) {

        if ( !this.deck) return false;

        var deepCheck = false;
        this.deck.cards.forEach(function (deckCard, index) {
            if (deckCard.id == id) deepCheck = index;
        });

        return deepCheck;
    };

    /*
     *
     */
    this.totalCards = function (index) {

        if (typeof this.decks[index] === "undefined") return false;

        var cardCount = 0;
        this.decks[index].cards.forEach(function (card, index) {
            cardCount += card.quantity;
        });
        return cardCount;
    };

    /*
     * Reutrns the quantity of the card using the id.
     */
    this.quantity = function (id) {
        var index = this.indexOf(id);
        if (index === false) return 0; //ERROR HERE// NO DECK SET
        return this.deck.cards[index].quantity;
    };

    /*
     * Removes a quantity of a card from the current deck
     */
    this.remove = function (id) {

        var index = this.indexOf(id);

        if (this.deck.cards[index].quantity <= 1) {
            this.delete(id);
        }
        else {
            this.deck.cards[index].quantity--;
        }
    };

    /*
     * Deletes a single card from the current deck and deletes it if needed.
     */
    this.delete = function (id) {
        var index = this.indexOf(id);

        this.deck.cards.splice(index, 1);

        if (this.deck.cards.length === 0) {
            this.deleteCurrentDeck();
        }
    };
});
