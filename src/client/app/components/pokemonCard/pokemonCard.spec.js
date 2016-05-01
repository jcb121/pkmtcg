describe('pokemonCard.js', function(){

	var $compile,
    	$rootScope,
		$scope,
		$element;

	var cardsSeriveMock = {
		get : jasmine.createSpy('get'),
		typeof : jasmine.createSpy('typeof')
	};

	var decksSeriveMock = {
		get : jasmine.createSpy('get'),
	};

	beforeEach(module('app'));
	beforeEach(module('app.templates'));
	beforeEach(module(function($provide) {
		//$provide.value("markedCards", "markedCards" );
		//$provide.value("activeCard", "activeCard" );
		$provide.value("cards", cardsSeriveMock);
		$provide.value("decks", decksSeriveMock );
		//$provide.value("typeChecker", "typeChecker");
	}));
	beforeEach(inject(function(_$compile_, _$rootScope_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	beforeEach(function(){
		var element = $compile("<pokemon-card></pokemon-card>")($rootScope);
		$rootScope.$digest();
		$scope = element.isolateScope() || element.scope();
	});
	it('should bind the decks service to $scope', function() {
		console.log($scope);
		//expect($scope.MarkedCards ).toEqual("markedCards");
	});
});
