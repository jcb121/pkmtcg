
rootApp.directive("cardFilter", function () {
    return {
        transclude: true,
        require: [],
        scope: {},
        templateUrl: "components/cardFilter/cardFilter.html",
        controller: function ($scope, cardTypes, cardProperties, cardNames, cards) {

            $scope.selected = {
                name: "",
                properties: [],
                types: [],
                legal:[]
            };

            $scope.legals = [
                {id:"1", name:"legal"},
                { id: "2", name: "extended" },
                { id: "3", name: "illegal" },
            ];

            //HTTP
            $scope.cardsService = cards;
            $scope.cardNamesService = cardNames;
            $scope.cardTypesService = cardTypes;
            $scope.cardPropertiesService = cardProperties;

        },
        link: function (scope, element, attrs, ngModel) {

            scope.$watch('selected', function (val) {

                var selected = {
                    name: val.name,
                    properties: [],
                    types: [],
                    legal: [],
                    ids : []
                };

                val.properties.forEach(function (value, index) {
                    if (value === true) selected.properties.push(index);
                });

                val.types.forEach(function (value, index) {
                    if (value === true) selected.types.push(index);
                });

                val.legal.forEach(function (value, index) {
                    if (value === true) selected.legal.push(index);
                });


               scope.cardsService.load(selected, function () {}, true);



            }, true);
        },
    };
});
