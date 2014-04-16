/**
 * Account module
 */
angular.module( 'bookie.company', [
  'ui.state',
  'ngResource',
  'ngGrid'
])
.config(function config($stateProvider){
  $stateProvider.state('companies', {
    url: '/companies',
    views: {
      "main":{
        controller: "CompaniesCtrl",
        templateUrl: "company/companies.tpl.html"
      }
    }
  }).state('company', {
    url: '/company?companyId',
    views:{
      "main":{
        controller: "CompanyCtrl",
        templateUrl: "company/company.tpl.html"
      }
    }
  });
})
.controller( 'CompaniesCtrl', function CompaniesController( $scope, CompanyRes, $state, $rootScope) {
  $rootScope.loggedIn = true;
  $scope.companies = CompanyRes.query();
  $scope.newCompany = function(){
    $state.transitionTo('company');
  };
  $scope.editCompany = function(company){
    $state.transitionTo('company', {companyId: company.id});
  };
})
.controller('CompanyCtrl', function CompanyController($scope, CompanyRes, $state, $stateParams, $rootScope){
  $rootScope.loggedIn = true;
  $scope.companyId = parseInt($stateParams.companyId, 10);
  if($scope.companyId){
    $scope.company = AccountRes.get({id: $scope.companyId});
  }else{
    $scope.company = new CompanyRes();
  }

  $scope.cancel = function(){
    $state.transitionTo("companies");
  };

  $scope.submit = function(){
    if($scope.accountId){
      $scope.company.$update(function(response){
        $state.transitionTo('companies');
      });
    }else{
      $scope.company.$save(function(response){
        $state.transitionTo('companies');
      });
    }
  };
})
.factory( 'CompanyRes', function ( $resource )  {
  return $resource('../companies/:id.json', {id:'@id'}, {'update': {method: 'PATCH'}});
})
.service( 'CompanyService',function (){
  return {
    getAccountId: 1
  };
})
;
