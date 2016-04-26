rootApp.service("webDecks", function ($http) {
    var self = this;
    this.decks = [];

    /*
     * Gets decks from the server and creates a deck objec
     */
    this.get = function(filters, overwrite, callback){

		if (filters === false) {

		}

		//gets all decks
		$http.get("http://pkm.52webdesigns.com/rest/decks.php").then(function (response) {

            self.decks = response.data;

            //builds out the deck object.
            self.decks.forEach(function (deck) {
                var tempCards = JSON.parse(deck.cards);
                deck.cards = [];
                tempCards.forEach(function (item) {
                    deck.cards.push({ id: item[0], quantity: item[1] });
                });
            });

            if( angular.isFunction(callback) ){
                callback(response);
            }
        });
    };

    /*
     * Saves or replaces a deck on the server
     */
    this.save = function( deck ){

    };

    /*
     * Deletes the deck from the server
     */
    this.delete = function(id){

    };

	this.get(false, true);
});
