/* describe('decks.service.js', function(){

	beforeEach(module('app'));

	var decks,
		deck,
		mockDecks = [{name:'A', id:1, cards:''},
					 {name:'B', id:2, cards:''},
					 {name:'C', id:3, cards:''}],
		webDecks={ decks: mockDecks},
		$mdToast = jasmine.createSpy('dummy');


	beforeEach(module(function($provide) {
		$provide.value("$mdToast", $mdToast);
		$provide.value("webDecks", webDecks);
	}));

	beforeEach(inject(function(_decks_, webDecks, deck, $mdToast){
		decks = _decks_;
		webDecks = webDecks;
		deck = deck;
		$mdToast = $mdToast;
	}));

	beforeEach(function(){
		decks.decks = [];
		decks.activeDeck = 0;
	});

	describe('newDeck', function(){
		it('should create a new deck without a name', function(){
			decks.newDeck();
			expect(decks.decks[0].name).toEqual('New Deck');
		});
		it('should create a new deck with a name', function(){
			decks.newDeck('testDeck');
			expect(decks.decks[0].name).toEqual('testDeck');
		});
		it('should create a new deck and set it as active', function(){
			decks.newDeck('testDeck', true);
			expect(decks.activeDeck).toEqual(0);
		});
	});
	describe('addDeck', function(){
		it('should add a deck from the webdecks service using ID to decks', function(){
			decks.addDeck(1);
			expect(decks.decks[0].id).toEqual(1);
		});
		it('should add a deck from the webdecks service using NAME to decks', function(){
			decks.addDeck(false);
			expect(decks.decks[0].name).toEqual('New Deck');
		});
	});
	describe('getDeck ', function(){
		it('should return a deck using the ID', function(){
			decks.decks = mockDecks;
			expect(decks.getDeck(1).name).toEqual('B');
		});
		it('should return active decks if no index', function(){
			decks.decks = mockDecks;
			expect(decks.getDeck(undefined).name).toEqual('A');
		});
		it('should create deck if not decks or index', function(){
			expect(decks.getDeck(undefined).name).toEqual('New Deck');
		});
		it('should create deck if no deck is found', function(){
			expect(decks.getDeck(5).name).toEqual('New Deck');
		});
	});
	describe('deleteDeck ', function(){
		it('should remove a deck from decks service using ID ', function(){
			decks.decks = mockDecks;
			decks.deleteDeck(0);
			expect(decks.decks[0].id).toEqual(2);
		});
		it('should remove the active deck from decks service and change the activeDeck', function(){
			decks.decks = mockDecks;
			decks.deleteDeck(1); //id 2
			expect(decks.getDeck().id).toEqual(2);
		});
		it('should decrease the activeDeck if out of range ', function(){
			decks.decks = mockDecks; //lenght 3
			decks.setActive(3); //index 2
			decks.deleteDeck(2); //id 2 //lenght 2
			expect(decks.getDeck().id).toEqual(2);
		});
	});
}); */
