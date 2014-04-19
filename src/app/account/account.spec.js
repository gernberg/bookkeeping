/**
 * Unit tests for the club functionality
 */
describe( 'Accounts list controller', function() {
  var scope, httpBackend;
  //mock Application to allow us to inject our own dependencies
  beforeEach(angular.mock.module('bookie'));

  /**
   * Make sure unauthorized access is correctly handled
   */ 
  describe('UnAuthorized acceess', function(){
    var location;
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_, $location, CompanyService){
    CompanyService.selectCompany(1);
      scope = $rootScope.$new();
      location = $location;

      scope.httpBackend = _$httpBackend_;

      scope.httpBackend.when('GET', '/?authCookie').respond(200, '');
      scope.httpBackend.expect('GET', '../companies/1/accounts.json').respond(401, '');

      $controller('AccountsCtrl', {$scope: scope});
    }));

    it('no accounts returned', function(){
      scope.$digest();
      scope.httpBackend.flush();
      expect(scope.accounts.length).toEqual(0);
    });  

    it('redirects to login', function(){
      scope.$digest();
      scope.httpBackend.flush();
      expect(location.path()).toBe('/login');
    });  
  });
  describe('Authorized acceess', function(){
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_){
      //create an empty scope
      scope = $rootScope.$new();

      scope.httpBackend = _$httpBackend_;

      scope.httpBackend.when('GET', '/?authCookie').respond(200, '');
      scope.httpBackend.expect('GET', '../companies/1/accounts.json').respond([
        {"account_number": "1234", "account_name":"asdi jiasodjio ","created_at":"2012-02-02T00:00:00Z","date_created":"2013-03-01T00:00:00Z","id":1,"updated_at":"2014-04-03T00:00:00Z"},
        {"account_number": "5768", "account_name":"Nman asdfasdf 2","created_at":"2012-02-02T00:00:00Z","date_created":"2014-03-01T00:00:00Z","id":2,"updated_at":"2014-04-03T00:00:00Z"}
        ]);

      //declare the controller and inject our empty scope
      $controller('AccountsCtrl', {$scope: scope});
    }));

    // tests start here
    it('Has two accounts defined', function(){
      scope.$digest();
      scope.httpBackend.flush();
      expect(scope.accounts.length).toEqual(2);
    });  

    it('First account is 1234', function(){
      scope.$digest();
      scope.httpBackend.flush();
      expect(scope.accounts[0].account_number).toEqual('1234');
    });
  });
});
