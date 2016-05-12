rootApp.controller('state.common', function ($scope, $mdSidenav ) {

	$scope.openSideNav = function(location){
		$mdSidenav(location).open();
	};

	$scope.closeSideNav = function (location){
    	$mdSidenav(location).close();
	};

});
