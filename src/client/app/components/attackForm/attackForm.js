
rootApp.directive("attackForm", function () {
    return {
        transclude: true,
        require: ['?ngModel'],
        scope: {
            model: '=ngModel'
        },
        templateUrl: "components/attackForm/attackForm.html",
        controller: function ($scope, cardAttacks, cardProperties) {

            $scope.attackChange = function () {

                if ($scope.cardAttacksService.info.indexOf($scope.name) > -1) {
                    $scope.newCard = false;
                }
                else if ($scope.name === "") {
                    $scope.newCard = false;
                }
                else {
                    $scope.newCard = true;
                }
            };

            $scope.cardAttacksService = cardAttacks;
            $scope.cardPropertiesService = cardProperties;
        },
        link: function (scope, element, attrs, ngModel) {

            scope.$watch('property', function () {
                updater();
            });
            scope.$watch('damage', function () {
                updater();
            });
            scope.$watch('name', function () {
                updater();
            });

            function updater() {
                scope.$eval(attrs.ngModel + ' = {n:name, d:damage, p:property }'); //sets the value of ngModel, ngModel is the name of the VAR.
            }

            scope.$watch(attrs.ngModel, function (val) {
                scope.model = val;
            });
        },
    };
});
