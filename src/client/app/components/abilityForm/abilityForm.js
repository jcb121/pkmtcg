rootApp.directive("abilityForm", function () {
    return {
        transclude: true,
        require: ["?ngModel"],
        scope: {
            model: '=ngModel'
        },
        templateUrl: "components/abilityForm/abilityForm.html",
        controller: function ($scope, cardAbilities, cardProperties, cardTriggers) {

            $scope.abilityChange = function () {

                if ($scope.cardAbilitiesService.info.indexOf($scope.name) > -1) {   //
                    $scope.newCard = false;
                }
                else if ($scope.name === "") {
                    $scope.newCard = false;
                }
                else {
                    $scope.newCard = true;
                }
            };

            $scope.cardAbilitiesService = cardAbilities;
            $scope.cardPropertiesService = cardProperties;
            $scope.cardTriggersService = cardTriggers;

        },
        link: function (scope, element, attrs, ngModel) {

        }
    };
});
