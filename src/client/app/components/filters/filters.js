
//removeHTTP
rootApp.filter('removeHTTP', [function () {
    return function (string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace("http://", '');
    };
}]);

rootApp.filter('removeSpaces', [function () {
    return function (string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}]);

rootApp.filter('removeTrainer', [function () {
    return function (string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace("Trainer-", '');
    };
}]);

/*
 * Used in ng-repeats to filter cards.
 * Not sure how this will work with page numbers.
 */
rootApp.filter('filterOutCards', function () {
    return function (items, types) {
		return items;
		/*var filtered = [];

		items.forEach(function(card){
			var pokemeon = ["Grass", "Lightning", "Darkness", "Fairy", "Fire", "Psychic", "Metal", "Dragon", "Water", "Fighting", "Colorless"];
			var trainer = ["Trainer-Item", "Trainer-Stadium", "Trainer-Supporter", "Pokemon Tool"];
			var engergy = ["Energy"];

			if (pokemeon.indexOf(card.type) != -1) card.type = "pokemon";
			if (trainer.indexOf(card.type) != -1) card.type = "trainer";
			if (engergy.indexOf(card.type) != -1) card.type = "engergy";

			types.forEach(function (type) {
	            if(type === card.type){
					filtered.push(card);
				}
	        });
		});
        return filtered;*/
    };
});

rootApp.filter('filterCards', function ( cards ) {
    return function (items, types) { // name is what to filter.....
        var filtered = [];

        types.forEach(function (type) {
            items.forEach(function (item, index) {
                var ctype = cards.typeof(item.id, true);
                if (ctype == type) filtered.push(item);
            });
        });
        return filtered;
    };
});

rootApp.filter('showPage', function () {
    return function (items, pageObject ) {
        var filtered = [];

        var start = pageObject.itemsPer * pageObject.page;
        var end = start + pageObject.itemsPer;

        if ( start <items.length && items.length > end ) {

            //check for array!
            while (start < end) {

                //console.log(items[start])

                filtered.push(items[start]);
                start++;
            }
            return filtered;

        }
        return items;
    };
});

rootApp.filter('getPageButtons', function () {
    return function (items, pageObject) {

        var filtered = [];
        var pagesNos = Math.ceil( items.length / pageObject.itemsPer );

        for (var i = 0; i < pagesNos; i++) {
            filtered.push(items[i]);
            //pages.push(i);
        }

        return filtered;
    };
});
