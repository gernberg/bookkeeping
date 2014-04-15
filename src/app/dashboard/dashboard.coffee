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
  $rootScope, AccountRes) ->
  $rootScope.loggedIn = true
  $scope.data = [
    (value: 100, label: "Kundfodringar"),
    (value: 200, label: "Bankkonto")
  ]
  $scope.accounts = AccountRes.query()
)
.factory( 'AccountRes', ($resource) ->
  $resource('../accounts/:id.json', {id:'@id'}, {'update': {method: 'PATCH'}})
)
