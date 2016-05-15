rootApp.controller('login', function ($scope, users, $state, $mdDialog) {
	$scope.login = function(){
		users.login($scope.user).then(function(){
			$state.go('home');
		}, function(data){
			console.log(data);
			$mdDialog.show(
		    $mdDialog.alert()
		        .parent(angular.element(document.querySelector('body')))
		        .clickOutsideToClose(true)
		        .title('Log in error')
		        .textContent(data.error)
		        .ariaLabel('Alert Login Error')
		        .ok('Got it!')
		    );
		});
	};
	$scope.register = function(){
		users.register($scope.user);
	};
	$scope.showRegister = false;
	$scope.toggleRegister = function(){
		$scope.showRegister = !$scope.showRegister;
	};
});
