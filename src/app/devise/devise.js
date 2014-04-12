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
  })
  ;
})
/**
 *  Login controller that handels login and logout
 */
.controller( 'LoginCtrl', function LoginController( $scope, $http, RequestMaker) {
  $scope.user = {email: null, password: null};
  $scope.error = {message: null, errors: {}};

  $scope.login = function() {
    RequestMaker.makeRequest({
      url: '../users/sign_in.json',
      data: {user: {email: $scope.user.email, password: $scope.user.password}},
      successCallback: function(){
        
      },

    });
  };

  $scope.logout = function() {
    $http({method: 'DELETE', url: '../users/sign_out.json', data: {}});
  };
})
/**
 *  Register controller that handles new registrations
 */
.controller( 'RegisterCtrl', function RegisterController( $scope, $http ) {
  $scope.user = {email: null, password: null};

  $scope.login = function() {
    RequestMaker.test();
    // $http.post('../users/sign_in.json', {user: {email: $scope.user.email, password: $scope.user.password}});
  };

  $scope.logout = function() {
    $http({method: 'DELETE', url: '../users/sign_out.json', data: {}});
  };
})
.factory( 'RequestMaker', function ($http){
  test = function(){
    alert("test");
  }
});
;
