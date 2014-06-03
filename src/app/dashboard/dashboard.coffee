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
  $rootScope, AccountRes, VoucherRes, FiscalYearRes,
  CompanyService, FiscalService) ->
  if(CompanyService.currentCompanyId() == null)
    return false
  if(FiscalService.currentFiscalYearId() == null)
    return false
  $rootScope.loggedIn = true
  $scope.data = [
    (value: 100, label: "Kundfodringar"),
    (value: 200, label: "Bankkonto")
  ]
  $scope.accounts = AccountRes.fiscal_year({
    cid: CompanyService.currentCompanyId(),
    fid: FiscalService.currentFiscalYearId()
  })
  $scope.vouchers = VoucherRes.query({
    cid: CompanyService.currentCompanyId(),
    fid: FiscalService.currentFiscalYearId()
  })
  $scope.fiscal_years = FiscalYearRes.query({
    cid: CompanyService.currentCompanyId()
  })
  $scope.result = 0
  $scope.balance = 0
  balance_categories = ["", "#4D9CDF", "#FF8F86"]
  result_categories = ["", "", "",
    "#4D9CDF", "#FF8F86",
    "#FF8F86", "#FF8F86",
    "#FF8F86"]
  $scope.accounts.$promise.then ()->
    $scope.result_accounts = []
    $scope.balance_accounts = []
    for i in [0..($scope.accounts.length-1)]
      data = $scope.accounts[i].sum
      category = Math.floor($scope.accounts[i].account_number/1000)
      if category < balance_categories.length
        $scope.balance += data
        color = balance_categories[category]
        $scope.balance_accounts.push {
          label: $scope.accounts[i].account_name,
          color: color,
          data: Math.abs(data)
        }
      else if category < result_categories.length
        $scope.result += data
        color = result_categories[category]
        $scope.result_accounts.push {
          label: $scope.accounts[i].account_name,
          color: color,
          data: Math.abs(data)
        }
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
