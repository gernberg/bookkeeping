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
  $scope.monthly = [
    [[1,3], [2,3], [3,10],[4,0],[5,50000],[6,70]],
    [[1,3], [2,-3], [3,-10], [4,-10], [5,-10]],
    [[1,6], [2,-3]]
  ]
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
.factory( 'VoucherRes', ($resource, FiscalService, CompanyService) ->
  $resource('../companies/:cid/fiscal_years/:fid/vouchers/:id.json', {
    fid: FiscalService.currentFiscalYearId(),
    cid: CompanyService.currentCompanyId(),
    id:'@id'
  }, {'update': {method: 'PATCH'}})
)
.factory( 'FiscalYearRes', ($resource) ->
  $resource('../fiscal_years/:id.json',
  {id:'@id'}, {'update': {method: 'PATCH'}})
)
