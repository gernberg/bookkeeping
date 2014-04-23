/**
 * Account module
 */
angular.module( 'bookie.fiscal_year', [
  'ui.state',
  'ngResource'
])
.config(function config($stateProvider){
  $stateProvider.state('fiscal_years', {
    url: '/fiscal_years',
    views: {
      "main":{
        controller: "FiscalYearsCtrl",
        templateUrl: "fiscal_year/fiscal_years.tpl.html"
      }
    }
  }).state('fiscal_year', {
    url: '/fiscal_year?fiscalYearId',
    views:{
      "main":{
        controller: "FiscalYearCtrl",
        templateUrl: "fiscal_year/fiscal_year.tpl.html"
      }
    }
  });
})
.controller( 'FiscalYearsCtrl', function FiscalYearsCtrl( $scope, FiscalYearRes, $state, $rootScope, FiscalService, $location) {
  $rootScope.loggedIn = true;
  $scope.fiscal_years = FiscalYearRes.query();
  $scope.newFiscalYear = function(){
    $state.transitionTo('fiscal_year');
  };
  $scope.editFiscalYear = function(fiscal_year){
    $state.transitionTo('fiscal_year', {fiscalYearId: fiscal_year.id});
  };
  $scope.selectFiscalYear = function(fiscal_year){
    FiscalService.selectFiscalYear(fiscal_year.id);
    $location.path("/dashboard");
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
    if($scope.fiscalYearId){
      $scope.fiscal_year.$update(function(response){
        $state.transitionTo('fiscal_years');
      }, function(response){
        $scope.start_date_errors = response.data.start_date;
        $scope.end_date_errors = response.data.end_date;
      });
    }else{
      $scope.fiscal_year.$save(function(response){
        $state.transitionTo('fiscal_years');
      }, function(response){
        $scope.start_date_errors = response.data.start_date;
        $scope.end_date_errors = response.data.end_date;
      });
    }
  };
})
.factory( 'FiscalYearRes', function ( $resource, CompanyService )  {
  return $resource('../companies/:cid/fiscal_years/:id.json', {cid: CompanyService.currentCompanyId(), id:'@id'}, {'update': {method: 'PATCH'}});
})
.service( 'FiscalService',function ($location, $rootScope, localStorageService){
  return {
    selectFiscalYear: function(fiscalYearId){
      // Persist current company ID in local storage
      localStorageService.add("fiscalYearId", fiscalYearId);
      $rootScope.fiscalYearId = fiscalYearId;
    },
    currentFiscalYearId: function(){
      if($rootScope.fiscalYearId == null){
        $location.path("/fiscal_years");
      }
      console.log("currentFiscalYearId", $rootScope.fiscalYearId);
      return $rootScope.fiscalYearId;
    }
  };
})

;
