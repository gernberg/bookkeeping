/**
 * The home module is the module for promoting the application
 */
angular.module( 'bookie.home', [
  'ui.state'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  }).state( 'pricing', {
    url: '/pricing',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/pricing.tpl.html'
      }
    },
    data:{ pageTitle: 'Pricing' }
  }).state( 'references', {
    url: '/references',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/references.tpl.html'
      }
    },
    data:{ pageTitle: 'References' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope ) {
})

;

