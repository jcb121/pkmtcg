describe('deckLoader.js', function(){

	var $compile,
    	$rootScope,
		$scope,
		$element,
		$q,
		decks;

	beforeEach(module('app'));
	beforeEach(module('app.templates'));
	beforeEach(module(function($provide) {
		$provide.service("decks", function(){
			this.get = function(){
				return $q.when('mockDecks');
			};
		});
	}));
	beforeEach(inject(function(_$compile_, _$rootScope_, _$q_, _decks_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		$q = _$q_;
		decks = _decks_;
	}));
	beforeEach(function(){
		var element = $compile("<deck-loader></deck-loader>")($rootScope);
		$rootScope.$digest();
		$scope = element.isolateScope() || element.scope();
	});
	it('should bind the decks service to $scope', function() {
		expect($scope.Decks).toEqual(decks);
	});
});
