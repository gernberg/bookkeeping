/**
 * Account module
 */
angular.module( 'bookie.account', [
  'ui.state'
])

/**
 * Define the route that this module relates to, and the page template and controller that is tied to that route
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'accounts', {
    url: '/accounts',
    views: {
      "main": {
        controller: 'AccountsCtrl',
        templateUrl: 'account/accounts.tpl.html'
      }
    },
    data:{ pageTitle: 'Accounts' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'AccountsCtrl', function ClubsController( $scope ) {
    $scope.accounts = [
      {account_name: "Försäljning", account_number: "3000"},
      {account_name: "Bankgiro", account_number: "1920"}
    ];
});
