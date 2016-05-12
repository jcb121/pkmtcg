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


	describe('When card data is passed into the directive',function(){
		beforeEach(function(){
			var element = $compile('<pokemon-card data="{name:\'mock\'}"></pokemon-card>')($rootScope);
			$rootScope.$digest();
			$scope = element.isolateScope() || element.scope();
		});
		it('should bind the data to card', function() {
			expect($scope.card.name).toEqual('mock');

		});


	});

	describe('When card data is absent in the directive',function(){
		beforeEach(function(){
			var element = $compile('<pokemon-card id="55"></pokemon-card>')($rootScope);
			$rootScope.$digest();
			$scope = element.isolateScope() || element.scope();
		});
		it('should bind the decks service to $scope', function() {

			expect(cardsSeriveMock.get ).toHaveBeenCalledWith({id:55});
		});
	});




});
