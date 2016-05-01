describe('deckLoader.js', function(){

	var $compile,
    	$rootScope,
		$scope,
		$element;

	beforeEach(module('app'));
	beforeEach(module('app.templates'));
	beforeEach(module(function($provide) {
		//decks calls Webdecks, Webdecks makes a HTTP request, Fake it.
		$provide.value("decks", "decks" );
	}));
	beforeEach(inject(function(_$compile_, _$rootScope_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	beforeEach(function(){
		var element = $compile("<deck-loader></deck-loader>")($rootScope);
		$rootScope.$digest();
		$scope = element.isolateScope() || element.scope();
	});
	it('should bind the decks service to $scope', function() {
		expect($scope.Decks).toEqual("decks");
	});
});
