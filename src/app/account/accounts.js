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
.controller( 'AccountsCtrl', function AccountsController( $scope, AccountRes, $state, CompanyService, $rootScope) {
    $rootScope.loggedIn = true;
    $scope.accounts = AccountRes.query({cid: CompanyService.currentCompanyId()});
    $scope.gridOptions = {
      data: 'accounts',
      columnDefs: [
        {field: 'id', displayName: 'Id'},
        {field: 'account_name', displayName: 'Account Name'},
        {field: 'account_number', displayName: 'Account Number'},
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
.controller('AccountCtrl', function AccountController($scope, AccountRes, $state, $stateParams, $rootScope, CompanyService, AccountCache){
  $rootScope.loggedIn = true;
  $scope.accountId = parseInt($stateParams.accountId, 10);
  if($scope.accountId){
    $scope.account = AccountRes.get({cid: CompanyService.currentCompanyId(), id: $scope.accountId});
  }else{
    $scope.account = new AccountRes({cid: CompanyService.currentCompanyId()});
  }

  $scope.cancel = function(){
    $state.transitionTo("accounts");
  };

  $scope.submit = function(){
    if($scope.accountId){
      $scope.account.$update({cid: CompanyService.currentCompanyId()}, function(response){
        AccountCache.removeAll();
        $state.transitionTo('accounts');
      });
    }else{
      $scope.account.$save(function(response){
        AccountCache.removeAll();
        $state.transitionTo('accounts');
      });
    }
  };
})
/**
 * Add a resource to allow us to get at the server
 */
.factory( 'AccountCache', function($cacheFactory){
  var cache = $cacheFactory("AC");
  return cache;
})
.factory( 'AccountRes', function ( $resource, AccountCache)  {
  //return $resource('../accounts/:id.json', {id:'@id'}, {'update': {method: 'PATCH'}});
  return $resource('../companies/:cid/accounts/:id.json', {id: '@id', cid: '@cid'}, {'update': {method: 'PATCH'},
    'query': {
      cache: AccountCache,
      isArray: true
    }
  });
});


