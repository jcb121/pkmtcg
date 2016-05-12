var rootApp = angular.module('app', ['ngMaterial', 'ui.router']);

rootApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  $stateProvider
	.state('common',{
		templateUrl: "layout/common/common.html",
		controller:'state.common'
	})
	.state('home', {
    	url: "/home",
    	templateUrl: "features/home/home.html",
		controller:'home',
		parent:'common'
    })
    .state('cardView', {
    	url: "/cardView/:cardId",
    	templateUrl: "features/cardView/cardView.html",
    	controller:'cardView',
		parent:'common',
		resolve:{
			card:function(cards, $stateParams){
				return cards.get({id:$stateParams.cardId});
			},
			matching:function(cards, $stateParams){
				return cards.matching($stateParams.cardId);
			}
		}
  	});
});
