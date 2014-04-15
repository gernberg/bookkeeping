#
# Dashboard module
#
angular.module( 'bookie.dashboard', [
  'ui.state',
  'ngResource'
])

.config ($stateProvider) ->
  $stateProvider.state( 'dashboard', {
    url: '/dashboard',
    views: {
      "main":{
      controller: "DasboardCtrl",
      templateUrl: "dashboard/dashboard.tpl.html"
      }
    },
    data: {pageTitle: "Dashboard"}
  })

.controller('DasboardCtrl', ($scope, $http, $location,
  $rootScope, AccountRes, VoucherRes, FiscalYearRes) ->
  $rootScope.loggedIn = true
  $scope.data = [
    (value: 100, label: "Kundfodringar"),
    (value: 200, label: "Bankkonto")
  ]
  $scope.accounts = AccountRes.query()
  $scope.vouchers = VoucherRes.query()
  $scope.fiscal_years = FiscalYearRes.query()
)
.factory( 'VoucherRes', ($resource) ->
  $resource('../vouchers/:id.json', {id:'@id'}, {'update': {method: 'PATCH'}})
)
.factory( 'FiscalYearRes', ($resource) ->
  $resource('../fiscal_years/:id.json',
  {id:'@id'}, {'update': {method: 'PATCH'}})
)
