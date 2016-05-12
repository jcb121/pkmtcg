/*
    Keeps track of the marked cards that have a Red Border around them. ONLY USES CARDS ID
*/
rootApp.service("markedCards", function () {
    var self = this;
    this.active = [];

    this.add = function (id) {
        this.active.push(id);
    };

    this.finder = function( cardId ){

        var deepCheck = false;
        this.active.forEach(function (id, index) {
            if (id == cardId) {
                deepCheck = index;
            }
        });
        return deepCheck;
    };

    this.check = function (index) {

        if (this.finder(index) !== false ) {
            return true;
        }
        else {
            return false;
        }
    };

    this.toggle = function (id) {

        id = Number(id);

        if (this.check(id)) {
            this.remove(id);
        }
        else {
            this.add(id);
        }

        console.log( this.active );
    };

    this.getActive = function () {
        return this.active;
    };

    this.clearActive = function () {
        this.active = [];
    };

    this.remove = function (id) {
        this.active.splice( this.finder(id), 1);
    };

});
