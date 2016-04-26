/*
    The holds the viewed card and also the matching cards.
*/
rootApp.service("activeCard", function ($http, cards) {

    var self = this;
    this.card = false;
    this.cards = [];

    /*
     * Checks if an Active card has been set, this is used for ng-hide
     */
    this.check = function () {
        if (this.card === false) {
            return false;
        }
        else {
            return true;
        }
    };

    /*
     * Removes the Active card and clears the matching cards
     */
    this.remove = function () {
        this.card = false;
        this.cards = [];
    };

    /*
     * Sets the active card and loads the matching cards.
     */
    this.set = function (card) {
        this.remove();
        this.card = card;
        this.loadMatching(this.card.id);
    };

    /*
     * gets the matched cards from the cards Service.
     */
    this.loadMatching = function (id) {
        $http.get("http://pkm.52webdesigns.com/rest/matches.php?id=" + id).then(function (response) {

            var data = response.data;

            self.matchingIds = [];
            data.forEach(function (card) {
                self.matchingIds.push(card.rel);
            });

            if (self.matchingIds.length > 0) {
                cards.get({ id: self.matchingIds }, false, function (response) {
                    self.cards = response.data;
                });
            }
        });
    };

    /*
     * Basic Getter function. May not be needed
     */
    this.getCard = function () {
        return this.card;
    };

    /*
     * Basic Getter function. May not be needed
     */
    this.getCards = function () {
        return this.cards;
    };
});
