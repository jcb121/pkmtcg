rootApp.controller("cardView", function ($scope, card, matching) {
	$scope.card = card.cards[0];
	$scope.cards = matching.cards;
});
