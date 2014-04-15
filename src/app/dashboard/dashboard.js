/**
 * Dashboard module
 */
angular.module( 'bookie.dashboard', [
  'ui.state',
  'ngResource'
])

.config(function config($stateProvider){
  $stateProvider.state( 'dashboard', {
    url: '/dashboard',
    views: {
      "main":{
      controller: "DasboardCtrl",
      templateUrl: "dashboard/dashboard.tpl.html"
      }
    },
    data: {pageTitle: "Dashboard"}
  });

})
.controller ('DasboardCtrl', function DashboardController($scope, $http, $location, $rootScope){
  $rootScope.loggedIn = true;
});
