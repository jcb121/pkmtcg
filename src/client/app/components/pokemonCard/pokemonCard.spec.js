describe('pokemonCard.js', function(){

	var $compile,
    	$rootScope,
		$scope,
		$element,
		cards;

	beforeEach(module('app'));
	beforeEach(module('app.templates'));
	beforeEach(module(function($provide) {
		$provide.service("cards", function($q){
			this.getById = jasmine.createSpy('getById').and.callFake(function(num) {
				return $q.when("ABC");
    		});
		});

	}));
	beforeEach(inject(function(_$compile_, _$rootScope_, _cards_, _decks_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		cards = _cards_;
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
			expect(cards.getById ).toHaveBeenCalledWith(55);
		});
	});




});
