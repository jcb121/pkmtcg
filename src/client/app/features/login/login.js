rootApp.controller('login', function ($scope, users, $state, $mdDialog) {
	$scope.login = function(){
		$scope.createLocked = true;
		users.login($scope.user).then(function(){
			$state.go('home');
		}, function(data){
			$mdDialog.show(
		    	$mdDialog.alert()
		        .parent(angular.element(document.querySelector('body')))
		        .clickOutsideToClose(true)
		        .title('Log in error')
		        .textContent(data.error)
		        .ariaLabel('Alert Login Error')
		        .ok('Got it!')
		    );
			$scope.createLocked = false;
		});
	};
	$scope.register = function(){
		$scope.registerLocked = true;
		users.register($scope.user).then(function(data){
			$scope.showRegister = false;
			$mdDialog.show(
		    	$mdDialog.alert()
		        .parent(angular.element(document.querySelector('body')))
		        .clickOutsideToClose(true)
		        .title('Account created')
		        .textContent('Your account was created successfully')
		        .ariaLabel('Account Created Alert')
		        .ok('Got it!')
		    );
			$scope.registerLocked = false;
		}, function(data){
			$mdDialog.show(
		    	$mdDialog.alert()
		        .parent(angular.element(document.querySelector('body')))
		        .clickOutsideToClose(true)
		        .title('Registration in error')
		        .textContent(data.error)
		        .ariaLabel('Alert Registration Error')
		        .ok('Got it!')
		    );
			$scope.registerLocked = false;
		});
	};
	$scope.showRegister = false;
	$scope.toggleRegister = function(){
		$scope.showRegister = !$scope.showRegister;
	};
});
