/**
 * Account module
 */
angular.module( 'bookie.account', [
  'ui.state',
  'ngResource',
  'ngGrid'
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
.controller( 'AccountsCtrl', function AccountsController( $scope, AccountRes) {
    $scope.accounts = AccountRes.query();
    $scope.gridOptions = {
      data: 'accounts',
      columnDefs: [
        {field: 'id', displayName: 'Id'},
        {field: 'account_name', displayName: 'Club Name'},
        {field: 'account_number', displayName: 'Contact Officer'}
      ],
      multiSelect: false
    };
})
/**
 * Add a resource to allow us to get at the server
 */
.factory( 'AccountRes', function ( $resource )  {
  return $resource('../accounts.json');
});


