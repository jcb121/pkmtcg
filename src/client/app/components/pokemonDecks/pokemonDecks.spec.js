describe('deck.service.js', function(){

	beforeEach(module('app'));

	var deck,
		deckObject,
		mockDeck;


	beforeEach(inject(function(_deck_){
		deck = _deck_;
	}));

	beforeEach(function(){
		mockDeck = [{id:1,quantity:1},
					{id:2,quantity:2},
					{id:3,quantity:3}];
		deckObject = new deck('Deck1', mockDeck, 55);
	});

	describe('addCard', function () {
		it('should add card by id to the deck', function () {
			deckObject.addCard(5);
			expect( deckObject.cards[ deckObject.indexOfCard(5)]).toEqual( {id:5, quantity:1});
        });
		it('should incriment a card by id in the deck', function () {
			deckObject.addCard(3);
			expect( deckObject.cards[ deckObject.indexOfCard(3)]).toEqual( {id:3, quantity:4});
        });
		/*EDGE CASE*/
		it('should add nothing to the deck', function(){
			deckObject.addCard(null);
			deckObject.addCard('STRING');
			expect(deckObject.cards).toEqual(mockDeck);
		});
    });

	describe('removeCard', function(){
		it('should decrement card by id in the deck', function () {
			deckObject.removeCard(3);
			expect( deckObject.cards[ deckObject.indexOfCard(3) ]).toEqual( {id:3, quantity:2});
        });
		it('should delete the card by id in the deck', function () {
			deckObject.removeCard(1);
			expect( deckObject.indexOfCard(1) ).toBeFalsy();
        });
		/*EDGE CASE*/
		/*it('should decrement nothing', function(){
			deckObject.removeCard(null);
			deckObject.removeCard('STRING');
			expect(deckObject.cards).toEqual(mockDeck);
		});*/
	});

	describe('deleteCard', function(){
		it('should remove a card by id from the deck', function () {
			deckObject.deleteCard(3);
			expect( deckObject.indexOfCard(3) ).toBeFalsy();
        });
		/*EDGE CASE*/
		/*it('should delete nothing', function(){
			deckObject.deleteCard(null);
			//deckObject.deleteCard('STRING');
			expect(deckObject.cards).toEqual(mockDeck);
		});*/
	});

	describe('quantityOfCard', function(){
		it('should remove a card by id from the deck', function () {
			expect( deckObject.quantityOfCard(2) ).toEqual(2);
        });
		/*EDGE CASE*/
	});

	describe('totalCards', function(){
		it('should count the number of cards in the deck', function () {
			expect( deckObject.totalCards() ).toEqual(6);
        });
		/*EDGE CASE*/
	});

});
