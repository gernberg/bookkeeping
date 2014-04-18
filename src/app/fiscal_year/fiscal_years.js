/**
 * Account module
 */
angular.module( 'bookie.fiscal_year', [
  'ui.state',
  'ngResource',
  'ngGrid'
])
.config(function config($stateProvider){
  $stateProvider.state('fiscal_years', {
    url: '/fiscal_years',
    views: {
      "main":{
        controller: "FiscalYearsCtrl",
        templateUrl: "fiscal_years/fiscal_years.tpl.html"
      }
    }
  }).state('fiscal_year', {
    url: '/fiscal_year?fiscalYearId',
    views:{
      "main":{
        controller: "FiscalYearsCtrl",
        templateUrl: "fiscal_years/fiscal_year.tpl.html"
      }
    }
  });
})
.controller( 'FiscalYearsCtrl', function FiscalYearsCtrl( $scope, FiscalYearRes, $state, $rootScope) {
  $rootScope.loggedIn = true;
  $scope.fiscal_years = FiscalYearRes.query();
  $scope.newFiscalYear = function(){
    $state.transitionTo('fiscal_year');
  };
  $scope.editFiscalYear = function(fiscal_year){
    $state.transitionTo('fiscal_year', {fiscalYearId: fiscal_year.id});
  };
})
.controller('FiscalYearCtrl', function FiscalYearCtrl($scope, FiscalYearRes, $state, $stateParams, $rootScope){
  $rootScope.loggedIn = true;
  $scope.fiscalYearId = parseInt($stateParams.fiscalYearId, 10);
  if($scope.fiscalYearId){
    $scope.fiscal_year = FiscalYearRes.get({id: $scope.fiscalYearId});
  }else{
    $scope.fiscal_year = new FiscalYearRes();
  }

  $scope.cancel = function(){
    $state.transitionTo("fiscal_years");
  };

  $scope.submit = function(){
    if($scope.accountId){
      $scope.company.$update(function(response){
        $state.transitionTo('fiscal_years');
      });
    }else{
      $scope.company.$save(function(response){
        $state.transitionTo('fiscal_years');
      });
    }
  };
})
.factory( 'CompanyRes', function ( $resource )  {
  return $resource('../companies/:id.json', {id:'@id'}, {'update': {method: 'PATCH'}});
})
.service( 'CompanyService',function ($location, $rootScope, localStorageService){
  return {
    selectCompany: function(companyId){
      // Persist current company ID in local storage
       localStorageService.add("companyId", companyId);
      $rootScope.companyId = companyId;
    },
    currentCompanyId: function(){
      if($rootScope.companyId == null){
        $location.path("/companies");
      }
      return $rootScope.companyId;
    }
  };
})
;
