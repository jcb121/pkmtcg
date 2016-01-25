(function(){
  var rootApp = angular.module('rootApp');

  rootApp.service('cards', cards);
  cards.$inject = ['$http'];
  var cards = function($http){

    var self = this;
    this.cards = [];

    /*
     * Loads card objects from the server.
     */
    this.load = function (filters, callback) {

        var url = "http://pkm.52webdesigns.com/rest/cards.php?";

        if (filters === false) {
            $http.get(url).then(function (response) {
                callback(response);
            });
        }
        else {

            if (typeof filters.id === "undefined") filters.id = [];
            if (typeof filters.name === "undefined") filters.name = "";
            if (typeof filters.types === "undefined") filters.types = [];
            if (typeof filters.properties === "undefined") filters.properties = [];

            if (!Array.isArray(filters.id)) filters.id = [filters.id];

            var preLoaded = this.checkLocalCards(filters.id);

            if (preLoaded.foundAll) {
                callback(preLoaded.cards);
            }
            else {
                $http.get(url + "id=" + filters.id.toString() + "&name=" + filters.name + "&types=" + filters.types.toString() + "&properties=" + filters.properties.toString()).then(function (response) {
                    response.data = response.data.concat(preLoaded.cards);
                    callback(response.data);
                });
            }
        }
        return this;
    };

    /*
     * reutns the type of card,
     */
    this.typeof = function (id, simple) {
        if (typeof id === "object") id = id.id;

        var checkedLocally = this.checkLocalCards(id);

        if (simple) {
            var pokemeon = ["Grass", "Lightning", "Darkness", "Fairy", "Fire", "Psychic", "Metal", "Dragon", "Water", "Fighting", "Colorless"];
            var trainer = ["Trainer-Item", "Trainer-Stadium", "Trainer-Supporter", "Pokemon Tool"];
            var engergy = ["Energy"];

            if (pokemeon.indexOf(checkedLocally.cards[0].type) != -1) return "pokemon";
            if (trainer.indexOf(checkedLocally.cards[0].type) != -1) return "trainer";
            if (engergy.indexOf(checkedLocally.cards[0].type) != -1) return "energy";
        }

        return checkedLocally.cards[0].type;
    }

    /*
     * Checks if the card is already loaded locally
     */
    this.checkLocalCards = function (ids) {

        var cards = [];
        var deleteIndex = [];
        var foundAll = false;
        var foundSome = false;
        var foundNone = true;

        if (typeof ids !== "object") ids = [ids];

        ids.forEach(function (id, index) {

            self.cards.forEach(function (card) {

                if (id == card.id) {
                    cards.push(card)
                    deleteIndex.push(index);
                };
            });
        });

        deleteIndex.reverse().forEach(function (index) {
            ids.splice(index, 1);
        });

        if (deleteIndex.length > 0 && ids.length < 1) {
            foundAll = true;
        }

        return {
            id: ids,
            cards: cards,
            foundAll: foundAll,
        }
    };

    /*
     * Worth checking for a single card?
     */
    this.checkLocalCard = function(){

    }
    /*
     * INIT SCRIPT
     */
    /*this.load(false, function (response) {
        self.cards = response;
    });*/
  }

})()
