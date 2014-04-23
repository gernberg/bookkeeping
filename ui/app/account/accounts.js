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
  })
  .state( 'account', {
    url: '/account?accountId',
    views: {
      "main": {
        controller: "AccountCtrl",
        templateUrl: "account/account.tpl.html"
      }
    },
    data: {pageTitle: 'Account'}
  }) 
  ;
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'AccountsCtrl', function AccountsController( $scope, AccountRes, $state, CompanyService) {
    $scope.accounts = AccountRes.query();
    $scope.gridOptions = {
      data: 'accounts',
      columnDefs: [
        {field: 'id', displayName: 'Id'},
        {field: 'account_name', displayName: 'Club Name'},
        {field: 'account_number', displayName: 'Contact Officer'},
         {displayName: 'Edit', cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="editAccount(row.entity)" >Edit</button> '}
           
      ],
      multiSelect: false
    };

    $scope.newAccount = function(account) {
      $state.transitionTo('account');
    };

    $scope.editAccount = function(account) {
      $state.transitionTo('account', { accountId: account.id });
    };
})
.controller('AccountCtrl', function AccountController($scope, AccountRes, $state, $stateParams){
  $scope.accountId = parseInt($stateParams.accountId, 10);
  if($scope.accountId){
    $scope.account = AccountRes.get({id: $scope.accountId});
  }else{
    $scope.account = new AccountRes();
  }
  
  $scope.cancel = function(){
    $state.transitionTo("accounts");
  };

  $scope.submit = function(){
    if($scope.accountId){
      $scope.account.$update(function(response){
        $state.transitionTo('accounts');
      });
    }else{
      $scope.account.$save(function(response){
        $state.transitionTo('accounts');
      });
    }
  };
})
/**
 * Add a resource to allow us to get at the server
 */
.factory( 'AccountRes', function ( $resource, CompanyService)  {
  //return $resource('../accounts/:id.json', {id:'@id'}, {'update': {method: 'PATCH'}});
  return $resource('../companies/:vid/accounts/:id.json', {vid:CompanyService.currentCompanyId}, {'update': {method: 'PATCH'}});
});


