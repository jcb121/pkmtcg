var rootApp = angular.module('app', ['ngMaterial', 'ui.router', 'ngMessages', 'ngPassword', 'ngCookies' ]);

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
    	url: '/home',
    	templateUrl: 'features/home/home.html',
  		controller:'home',
  		parent:'common'
    })
    .state('cardForm', {
    	url: '/cardForm',
    	templateUrl: 'features/cardForm/cardForm.html',
  		controller:'cardForm',
  		parent:'common',
      resolve:{
        cardNames:function(cards){
          return cards.get({perPage:-1});
        },
        attackNames:function(cardAttacks){
          return cardAttacks.get();
        },
        abilityNames:function(cardAbilities){
          return cardAbilities.get();
        }
      }
    })
    .state('cardView', {
    	url: '/cardView/:cardId',
    	templateUrl: 'features/cardView/cardView.html',
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
	})
	.state('login', {
		url:'/login',
		templateUrl: 'features/login/login.html',
    	controller:'login'
	});
});
