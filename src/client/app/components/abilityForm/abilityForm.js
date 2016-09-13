rootApp.directive("abilityForm", function() {
    return {
        transclude: true,
        require: ["?ngModel"],
        scope: {
            model: '=ngModel',
            abilities: '=options'
        },
        templateUrl: "components/abilityForm/abilityForm.html",
        controller: function($scope, cardProperties, cardTriggers) { /**/

            cardProperties.get().then(function(properties) {
                $scope.cardProperties = properties;
            });

            cardTriggers.get().then(function(triggers) {
                $scope.cardTriggers = triggers;
            });

            $scope.selectEntry = function(text) {
                $scope.newAbility = false;
            };

            $scope.textEntry = function(text) {
                if (text.length > 3) {
                    $scope.newAbility = true;
                }
            };
            
            $scope.createAbility = function(){
              
            }
        }
    };
});