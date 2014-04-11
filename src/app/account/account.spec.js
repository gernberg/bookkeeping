/**
 * Unit tests for the club functionality
 */
describe( 'Accounts list controller', function() {
  //mock Application to allow us to inject our own dependencies
  beforeEach(angular.mock.module('bookie'));

  //mock the controller for the same reason and include $rootScope and $controller
  beforeEach(angular.mock.inject(function($rootScope, $controller){
    //create an empty scope
    scope = $rootScope.$new();

    //declare the controller and inject our empty scope
    $controller('AccountsCtrl', {$scope: scope});
  }));

  // tests start here
  it('Has two accounts defined', function(){
    expect(scope.accounts.length).toEqual(2);
  });  
});
