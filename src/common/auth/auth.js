/**
 * Authentication module, redirects to homepage if not logged in 
 */

angular.module('common.auth', [])

.config(function($httpProvider){
  var interceptor = function($q, $location, $rootScope) {
    return {
      'responseError': function(rejection) {
        if (rejection.status == 401) {
          $rootScope.$broadcast('event:unauthorized');
          $location.path('/login');
          return rejection;
        }
        return $q.reject(rejection);        
      }
    };
  };
  $httpProvider.interceptors.push(interceptor);
});
