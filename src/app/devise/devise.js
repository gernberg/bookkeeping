/**
 * Login module
 */
angular.module( 'bookie.devise', [
    'ui.state'
    ])

/**
 *  * Define the route that this module relates to, and the page template and controller that is tied to that route
 *   */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'devise', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'devise/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Logga in' }
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
.controller( 'LoginCtrl', function LoginController( $scope, $http, $rootScope, $location) {
  $rootScope.fullWidthLayout = true;
  $scope.user = {email: null, password: null};
  $scope.signup = {email:null, password:null, password_repeat:null};
  $scope.error = {message: null, errors: {}};
  $scope.signup_error = {message: null, errors: {}};

  $scope.login = function() {
    $http({
      url: '../users/sign_in.json',
      data: {user: {email: $scope.user.email, password: $scope.user.password}},
      method: "POST"})
      .success(function(){
        $location.path("/accounts");
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

  $scope.register = function() {
    $http({
      url: '../users.json',
      data: {user: {email: $scope.signup.email, password: $scope.signup.password, password_confirmation: $scope.signup.password_confirmation}},
      method: "POST"})
      .success(function(data, status){ 
        console.log(data);
      })
    .error(function(data, status){
      $scope.signup_error.errors = data.errors;
    });

  };
});
