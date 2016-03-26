
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
rootApp.filter('filterOutCards', function (cards) {
    return function (items, types) {
        var filtered = [];

        types.forEach(function (type) {
            items.forEach(function (item, index) {
                var ctype = cards.typeof(item.id, true);
                if (ctype == type) item = false;
            });
        });

        items.forEach(function (item) {
            if (item !== false) {
                filtered.push(item);
            }
        });


        return filtered;
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
