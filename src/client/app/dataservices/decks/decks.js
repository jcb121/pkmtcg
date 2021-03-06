/**
 * @ngdoc interface
 * @name decksWebserver
 * @param {int} user_id id of the current user
 * @param {string} name a name of the deck
 * @param {array} cards an array of cars
 * @description
 *
 * <h4>cards are stored in an array format</h4>
 * <pre>[[1,1],[2,1],[3,1]]</pre>
 * index 0 of the array is the card id <br />
 * index 1 of the array is the card quantity
 */

 /**
  * @ngdoc service
  * @name rootApp.service:decks
  * @description
  * holds deck objects
  */
rootApp.service("decks", function ($http, $q, users, deck, userMessages) {
    var self = this,
		cache = [],
		url = "http://celtco.net/pkmtcg/rest/decks.php?";

	/**
	* @ngdoc method
	* @name get
	* @methodOf rootApp.service:decks
	* @description
	* Gets all decks from the server
	* @returns {array} array of deck objects
	*/
	this.get = function(filters){
		var deffered = $q.defer();
		filters = angular.copy(filters);
		if (angular.isUndefined(filters)) filters = {};
		if (angular.isUndefined(filters.id)) filters.id = "";
		if (angular.isUndefined(filters.user_id)) filters.user_id = "";
		if (angular.isUndefined(filters.name)) filters.name = "";
		if (angular.isUndefined(filters.pageNo)) filters.pageNo = "";
        if (angular.isUndefined(filters.perPage)) filters.perPage = "";
		/*Type Check*/
        if (!Array.isArray(filters.id)) filters.id = [filters.id];

		$http.get(url + "id=" + filters.id.toString() + "&user_id=" + filters.user_id + "&name=" + filters.name + "&pageNo=" + filters.pageNo + "&perPage=" + filters.perPage).then(function (response) {
			var decks = response.data;
			decks.forEach(function (deck, index) {
                var tempCards = JSON.parse(deck.cards);
                deck.cards = [];
                tempCards.forEach(function (item) {
                    deck.cards.push({ id: item[0], quantity: item[1] });
                });
				decks[index] = self.newDeck( deck.name, deck.cards, deck.id);
            });
			cacheDecks(decks);
			deffered.resolve(decks);
		});
		return deffered.promise;
	};

	this.create = function(deck){
		var deffered = $q.defer();
		var session = users.getSession();
		var cards = [];

		if(!session){
			deffered.reject('No session');
		}else{
			deck.cards.forEach(function(card){
				cards.push([ Number(card.id), Number(card.quantity)]);
			});
			$http.post(url, { session:session, name:deck.name, cards: cards}).then(function(response){
				if(response.data.success){
					deffered.resolve(response.data);
				}
				else{
					if(response.data.auth){
						users.setSession(false);
					}
					deffered.reject(response.data);
				}
			});
		}
		return deffered.promise;
	};

	/*this.delete = function(){

	};*/

	/*this.patch = function(){

	};*/

	function checkDeckCache(id){
		for(var i = 0; i < cache.length; i++){
			if( id === cache[i].id){
				return cache[i];
			}
		}
		return false;
	}

	function cacheDecks(decks){
		decksLoop:
		for(var i = 0; i < decks.length; i++){
			var found = true;
			cacheLoop:
			for(var j = 0; j < cache.length; j++){
				if( decks[i].id === cache[j].id){
					found = false;
					break cacheLoop;
				}
			}
			if(found){
				cache.push(decks[i]);
			}
		}
	}

	this.decks = [];

	/**
	 * @ngdoc method
	 * @name newDeck
	 * @methodOf rootApp.service:decks
	 * @description
	 * Creates a deck object
	 * @param {string} name name of deck
	 * @param {array} cards an array of cards
	 * @param {int} id id of deck
	 * @returns {object} deck object
	 */
	this.newDeck = function (name, cards, id) {
		var tempDeck;
		if( angular.isUndefined(name) ){
			name = 'New Deck';
			tempDeck = new deck(name, []);
		}
		else{
			tempDeck = new deck(name, cards, id);
		}
    userMessages.toast('New deck created');
		return tempDeck;
    };

	/**
	 * @ngdoc method
	 * @name addDeck
	 * @methodOf rootApp.service:decks
	 * @description
	 * Add a deck from the server or create one if no deck is found
	 * @param {int} id id of deck
	 * @returns {object} deck object
	 */
	this.addDeck = function (id) {
		var deffered = $q.defer();
		if( angular.isDefined(id)){

			var cache = checkDeckCache(id);
			if(cache !== false){
				this.decks.unshift(cache);
				deffered.resolve(cache);
			}else{
				this.get(id).then(function(response){
					if(response.length === 1){
						tempDeck = self.newDeck(response[0].name, response[0].cards, response[0].id);
						this.decks.unshift(tempDeck);
						deffered.resolve(tempDeck);
					}else{
						tempDeck = this.newDeck();
						self.decks.unshift(tempDeck);
						deffered.resolve(tempDeck);
					}
				});
			}
		}
		else{
			tempDeck = this.newDeck();
			this.decks.unshift(tempDeck);
			deffered.resolve(tempDeck);
		}
		return deffered.promise;
	};

	/**
	 * @ngdoc method
	 * @name getDeck
	 * @methodOf rootApp.service:decks
	 * @description
	 * returns the deck at the given index, if not a new deck is created
	 * @param {index} id id of deck
	 * @returns {object} deck object
	 */
    this.getDeck = function (index) {
		var tempDeck;
		if (angular.isUndefined(index)){
			if(angular.isUndefined( this.decks[this.activeDeck])){
				tempDeck = this.newDeck();
				this.decks.unshift(tempDeck);
				return tempDeck;
			}else{
				return this.decks[this.activeDeck];
			}
		}
		else if( angular.isUndefined(this.decks[index])) {
			tempDeck = this.newDeck();
			this.decks.unshift(tempDeck);
			return tempDeck;
        }
		return this.decks[index];
    };

	/**
	* @ngdoc method
	* @name deleteDeck
	* @methodOf rootApp.service:decks
	* @description
	* deleted the deck at the given index, if not a new deck is created
	* @param {index} id id of deck
	* @returns {bool} true if a deck is deleted
	*/
    this.deleteDeck = function (index) {
		if (angular.isDefined(index)){
			if( angular.isDefined(this.decks[index])) {
				this.decks.splice(index, 1);
				return true;
			}
		}
		return false;
    };

});
