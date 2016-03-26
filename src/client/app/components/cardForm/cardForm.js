rootApp.directive("cardForm", function () {
    return {
        transclude: true,
        require: [],
        templateUrl: "components/cardForm/cardForm.html",
        scope: {},
        controller: function ($scope, cardNames, cardProperties ) {

            $scope.nameChange = function (name) {};

            $scope.setImage = function (image) {
                $scope.card.image = image.value;
                $scope.validate();
            };

            $scope.validate = function () {

                //console.log("val running");

                function empty(val) {
                    if (typeof val === "undefined" || val === "") {
                        return true;
                    } else {
                        return false;
                    }
                }
                var count = 0;
                var poke = 0;
                var train = 0;

                //console.log($scope.card.image);

                // Base
                if (empty($scope.card.name) || empty($scope.card.image)) {
                    count++;
                }

                // Trainer  // && !empty($scope.card.supporter)
                if (!empty($scope.card.property)) {
                    console.log("train done");
                }
                else { train++; }

                // Pokemon // && !empty($scope.card.ability) && !empty($scope.card.attack2.n) && !empty($scope.card.attack3.n)
                if (!empty($scope.card.health) && !empty($scope.card.attack1.n)) {
                    console.log("poke done");

                    //MORE VALIDATION HERE CHECK IF ATTACK EXSISTS OR NOT

                }
                else { poke++; }

                if (count === 0 && (poke === 0 || train === 0)) {
                    $scope.valid = true;
                } else {
                    $scope.valid = false;
                }
            };



            $scope.cardPropertiesService = cardProperties;
            $scope.cardNamesService = cardNames;

        },
        link: function (scope, element, attrs, ngModel) {
            scope.$watch('card.attack1', function (val) {
                if (val) {
                    if (typeof val.n === "undefined" || val.n == "") {
                        scope.showAttack2 = false;
                    }
                    else {
                        scope.showAttack2 = true;
                    }
                }
            });
            scope.$watch('card.attack2', function (val) {
                if (val) {
                    if (typeof val.n === "undefined" || val.n == "") {
                        scope.showAttack3 = false;
                    }
                    else {
                        scope.showAttack3 = true;
                    }
                }
            });

            scope.$watch('card', function (val) {
                scope.validate();

            }, true);

        }
    };
});
