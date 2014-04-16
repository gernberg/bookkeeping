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
  $scope.assets = [
    (label:"Kundfodringar", data:40000)
    (label:"Tillgångar", data:120000)
  ]
  $scope.budget = [
    (label:"Omsättning", data:15000, color:"#090")
    (label:"Budgeterat för period", color:"#900", data:3000)
    (label:"Budgeterat för period", color:"#ccc", data:17000)
  ]
  $scope.what = [
    (label:"Genomsnittlig bokföringstid", data:13)
    (label:"Ojoj", data:17)
  ]

)
.factory( 'VoucherRes', ($resource) ->
  $resource('../vouchers/:id.json', {id:'@id'}, {'update': {method: 'PATCH'}})
)
.factory( 'FiscalYearRes', ($resource) ->
  $resource('../fiscal_years/:id.json',
  {id:'@id'}, {'update': {method: 'PATCH'}})
)
