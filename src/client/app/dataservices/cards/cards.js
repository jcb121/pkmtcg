rootApp.service("cards", function ($http, $q) {

    var url = "http://celtco.net/pkmtcg/rest/cards.php?";
	var cache = [];


	this.get = get;
	this.getById = getById;
	this.matching = matching;
	this.typeOf = typeOf;


    /*
     * Loads card objects from the server.
     */
	function get(filters) {
		filters = angular.copy(filters);
		var gettingCards = $q.defer();
		/*Defaults*/
		if (angular.isUndefined(filters)) filters = {};
		if (angular.isUndefined(filters.id)) filters.id = [];
        if (angular.isUndefined(filters.name)) filters.name = "";
        if (angular.isUndefined(filters.types)) filters.types = [];
        if (angular.isUndefined(filters.properties)) filters.properties = [];
        if (angular.isUndefined(filters.pageNo)) filters.pageNo = "";
        if (angular.isUndefined(filters.perPage)) filters.perPage = "";
		/*Type Check*/
        if (!Array.isArray(filters.id)) filters.id = [filters.id];

        $http.get(url + "id=" + filters.id.toString() + "&name=" + filters.name + "&types=" + filters.types.toString() + "&properties=" + filters.properties.toString() + "&pageNo=" + filters.pageNo  + "&perPage=" + filters.perPage).then(function (response) {
			cacheCards(response.data.cards);
			gettingCards.resolve(response.data);
        });
		return gettingCards.promise;
    }

	function getById(id){
		var deffered = $q.defer();

		var cache = checkCardCache(id);
		if(cache !== false){
			deffered.resolve(cache);
		}else{
			$http.get(url + "id=" + id).then(function (response) {
				cacheCards(response.data.cards);
				deffered.resolve(response.data.cards);
	        });
		}
		return deffered.promise;
	}

	function matching(id) {
		var gettingMatches = $q.defer();
		$http.get("http://celtco.net/pkmtcg/rest/matches.php?id=" + id).then(function (response) {
			var matchingIds = [];
            response.data.forEach(function (card) {
                matchingIds.push(card.rel);
            });
            if (matchingIds.length > 0) {
				get({ id: matchingIds }).then(function(response){
					gettingMatches.resolve(response);
				});
            }
        });
		return gettingMatches.promise;
    }

    /*
     * reutns the type of from the server
     */
    function typeOf(id, simple){

		var gettingTypeOf = $q.defer();
        if (angular.isObject(id)) id = id.id;
		this.get({id:id}).then(function(cards){
			cacheCards(cards[0]);
			if (simple) {
	            var pokemeon = ["Grass", "Lightning", "Darkness", "Fairy", "Fire", "Psychic", "Metal", "Dragon", "Water", "Fighting", "Colorless"];
	            var trainer = ["Trainer-Item", "Trainer-Stadium", "Trainer-Supporter", "Pokemon Tool"];
	            var engergy = ["Energy"];
	            if (pokemeon.indexOf(cards[0].type) != -1) gettingTypeOf.resolve('pokemon');
	            if (trainer.indexOf(cards[0].type) != -1) gettingTypeOf.resolve('trainer');
	            if (engergy.indexOf(cards[0].type) != -1) gettingTypeOf.resolve('energy');
	        }
		});
        return gettingTypeOf.promise;
    }

	function checkCardCache(id){
		for(var i = 0; i < cache.length; i++){
			if( id === cache[i].id){
				return cache[i];
			}
		}
		return false;
	}

	function cacheCards(cards){
		cardsLoop:
		for(var i = 0; i < cards.length; i++){
			var found = true;
			cacheLoop:
			for(var j = 0; j < cache.length; j++){
				if( cards[i].id === cache[j].id){
					found = false;
					break cacheLoop;
				}
			}
			if(found){
				cache.push(cards[i]);
			}
		}
	}
});
