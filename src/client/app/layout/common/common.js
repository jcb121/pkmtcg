rootApp.controller('state.common', function ($scope, $mdSidenav, serverSession, users ) {

	$scope.serverSession = serverSession;
	$scope.users = users;
	
	$scope.openSideNav = function(location){
		$mdSidenav(location).open();
	};

	$scope.closeSideNav = function (location){
    	$mdSidenav(location).close();
	};

});
