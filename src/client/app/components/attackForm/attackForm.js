rootApp.directive("attackForm", function() {
    return {
        transclude: true,
        require: ['?ngModel'],
        scope: {
            model: '=ngModel',
            attacks: '=options'
        },
        templateUrl: "components/attackForm/attackForm.html",
        controller: function($scope, cardProperties) {
            cardProperties.get().then(function(properties) {
                $scope.cardProperties = properties;
            });

            $scope.selectEntry = function(text) {
                $scope.newAttack = false;
            };

            $scope.textEntry = function(text) {
                if (text.length > 3) {
                    $scope.newAttack = true;
                }
            };
        }
    };
});