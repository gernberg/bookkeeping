/**
 * Account module
 */
angular.module( 'bookie.report', [
  'ui.state',
  'ngResource',
  'ngGrid'
])
.config(function config($stateProvider){
  $stateProvider.state('reports', {
    url: '/reports',
    views: {
      "main":{
        controller: "ReportsController",
        templateUrl: "report/reports.tpl.html"
      }
    }
  });
})
.controller( 'ReportsController', function CompaniesController( $scope, CompanyRes, $state, $rootScope, CompanyService) {
  $rootScope.loggedIn = true;
});
