describe("Voucher controller", function(){
  var scope, httpBackend;

  beforeEach(angular.mock.module("bookie"));

  describe('Add voucher', function(){
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_, $location, CompanyService, FiscalService){

      CompanyService.selectCompany(1);
      FiscalService.selectFiscalYear(1);
      scope = $rootScope.$new();
      location = $location;

      scope.httpBackend = _$httpBackend_;

      scope.httpBackend.when('GET', '/?authCookie').respond(200, '');
      scope.httpBackend.when('GET', '/?authCookie').respond(200, '');

      $controller('VoucherCtrl', {$scope: scope});

      it("Should send correct params", function(){
        scope.$digest();
        scope.httpBackend.flush();
        scope.submit();
      });
      it("Should send correct params", function(){
        scope.$digest();
        scope.httpBackend.flush();
        scope.submit();
      });

    }));
  });
});
