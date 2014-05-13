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
      controller: "DashboardCtrl",
      templateUrl: "dashboard/dashboard.tpl.html"
      }
    },
    data: {pageTitle: "Dashboard"}
  })

.controller('DashboardCtrl', ($scope, $http, $location, $state,
  $rootScope, AccountRes, VoucherRes, FiscalYearRes) ->
  $rootScope.loggedIn = true
  $scope.data = [
    (value: 100, label: "Kundfodringar"),
    (value: 200, label: "Bankkonto")
  ]
  $scope.accounts = AccountRes.query()
  $scope.vouchers = VoucherRes.query()
  $scope.fiscal_years = FiscalYearRes.query()
  $scope.result = -100000
  $scope.balance = 100000
  $scope.monthly = [
    [[1,3], [2,3], [3,10],[4,0],[5,50000],[6,70]],
    [[1,3], [2,-3], [3,-10], [4,-10], [5,-10]],
    [[1,6], [2,-3]]
  ]
  $scope.assets = [
    (label:"Domestic sales", data:140000, color:"#C3CC7C")
    (label:"International sales", data:90000, color:"#D3DC8C")
    (label:"Supplies", data:140000, color:"#FF6F66")
    (label:"Staff", data:140000, color:"#FF7F76")
    (label:"Other expenses", data:90000, color:"#FF8F86")
  ]
  #C3CC7C
  $scope.what = [
    (label:"Current assets", data:30000, color:"#4D9CDF")
    (label:"Liquid assets", data:20000, color:"#5DACFF")
    (label:"Absolute liquid assets", data:90000, color:"#6DBCFF")
    (label:"Salaries payable", data:50000, color:"#FF6F66")
    (label:"Accounts payable", data:40000, color:"#FF7F76")
    (label:"Long term loans", data:10000, color:"#FF8F86")
  ]
  $scope.newVoucher = () ->
    $state.transitionTo('voucher')
  $scope.showVoucher = (voucher) ->
    $state.transitionTo('showVoucher', {voucherId: voucher.id})
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
