/**
 * Login module
 */
angular.module( 'bookie.login', [
    'ui.state'
    ])

/**
 *  * Define the route that this module relates to, and the page template and controller that is tied to that route
 *   */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'devise/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  })
  .state( 'register', {
    url: '/register',
    views: {
      "main": {
        controller: 'RegisterCtrl',
        templateUrl: 'devise/register.tpl.html'
      }
    },
    data:{ pageTitle: 'Register' }
  });
})
/**
 *  Login controller that handels login and logout
 */
.controller( 'LoginCtrl', function LoginController( $scope, $http, RequestMaker) {
  $scope.user = {email: null, password: null};
  $scope.error = {message: null, errors: {}};

  $scope.login = function() {
    $http({
      url: '../users/sign_in.json',
      data: {user: {email: $scope.user.email, password: $scope.user.password}},
      method: "POST"})
      .success(function(){
        alert("Signed in!");
      })
    .error(function(data, status){
      $scope.error.message = data.error;
    });
  };

  $scope.logout = function() {
    $http({method: 'DELETE', url: '../users/sign_out.json', data: {}})
    .success(function(){
      $scope.error.message = "Signed out";
    });
  };
})
/**
 *  Register controller that handles new registrations
 */
.controller( 'RegisterCtrl', function RegisterController( $scope, $http ) {
  $scope.user = {email: null, password: null};
  $scope.error = {message:null, errors: {}};

  $scope.login = function() {
    // $http.post('../users/sign_in.json', {user: {email: $scope.user.email, password: $scope.user.password}});
  };

  $scope.logout = function() {
    $http({method: 'DELETE', url: '../users/sign_out.json', data: {}});
  };
})
.factory( 'RequestMaker', function ($http){
  return {
    makeRequest: function(params){
      $http({
        url: params.url,
      method: params.method,
      data: params.data
      })
      .success(params.successCallback)
  .error(function(data, status){
    params.errorMessages.message = data.error;
  });
    }
  };
});
