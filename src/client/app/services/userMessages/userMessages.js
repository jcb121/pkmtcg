rootApp.service('userMessages', function($mdDialog, $mdToast){

	this.showToast = function(text, ok){
		var toast = $mdToast.simple()
          .textContent(text)
          .action(ok)
          .highlightAction(false)
          .position('body');
	    return $mdToast.show(toast);
	};

	this.toastConfirm = function(text){
	    $mdToast.show(
	      $mdToast.simple()
	        .textContent(text)
	        .position('body')
	        .hideDelay(3000)
	    );
	};

	this.alert = function(title, aria, text, ok){
		return $mdDialog.show(
	    	$mdDialog.alert()
		        .parent(angular.element(document.querySelector('body')))
		        .clickOutsideToClose(true)
		        .title(title)
		        .textContent(text)
		        .ariaLabel(aria)
		        .ok(ok)
		        .targetEvent(ev)
	    );
	};

	this.confirm = function(title, aria, text, ok, cancel){
		var confirm = $mdDialog.confirm()
	        .title(title)
	        .textContent(text)
	        .ariaLabel(aria)
	        .ok(ok)
	        .cancel(cancel);

	    return $mdDialog.show(confirm);
	};
});
