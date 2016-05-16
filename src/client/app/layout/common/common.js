rootApp.controller('state.common', function ($scope, $mdSidenav, users ) {

	$scope.Users = users;

	$scope.openSideNav = function(location){
		$mdSidenav(location).open();
	};

	$scope.closeSideNav = function (location){
    	$mdSidenav(location).close();
	};

});
