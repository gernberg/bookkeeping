/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe( 'devise', function() {
  var scope, httpBackend, location;
  beforeEach( angular.mock.module( 'bookie.devise' ) );
  beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_, $location){
    location = $location;
    scope = $rootScope.$new();
    scope.httpBackend = _$httpBackend_;
  }));
  describe('LoginCtrl', function(){
    beforeEach(angular.mock.inject(function($controller){
      $controller("LoginCtrl", {$scope: scope}); 
    }));
    describe('Login redirects', function(){
      it('logins user', function(){
        scope.httpBackend.expect('POST', '../users/sign_in.json', '{"user":{"email":"a@a.a","password":"a"}}').respond(201, '');
        scope.user = {
          email: "a@a.a",
          password: "a"
        };
        scope.login();
        scope.$digest();
        scope.httpBackend.flush();

        expect(location.path()).toBe('/dashboard');
      });
    });
  });
});

