angular.module( 'bookie.voucher', [
  'ui.state',
  'ngResource'
])
.config(function config($stateProvider){
  $stateProvider.state('vouchers', {
    url: '/vouchers',
    views: {
      "main":{
        controller: "VouchersCtrl",
        templateUrl: "voucher/vouchers.tpl.html"
      }
    },
    data: {
      pageTitle: "Voucher"
    }
  }).state('voucher', {
    url: '/voucher?voucherId',
    views:{
      "main":{
        controller: "VoucherCtrl",
        templateUrl: "voucher/voucher.tpl.html"
      }
    },
    data: {
      pageTitle: "Voucher"
    }
  });
})
.controller( 'VouchersCtrl', function VouchersController( $scope, VoucherRes, $state, $rootScope) {
  $rootScope.loggedIn = true;
  $scope.vouchers = VoucherRes.query();
  $scope.newVoucher = function(){
    $state.transitionTo('voucher');
  };
  $scope.editVoucher = function(voucher){
    $state.transitionTo('voucher', {voucherId: voucher.id});
  };
})
.controller('VoucherCtrl', function VoucherCtrl($scope, VoucherRes, $state, $stateParams, $rootScope){
  $rootScope.loggedIn = true;
  $scope.voucherId = parseInt($stateParams.voucherId, 10);
  if($scope.voucherId){
    $scope.voucher = VoucherRes.get({id: $scope.voucherId});
  }else{
    $scope.voucher = new VoucherRes();
    $scope.voucher.voucher_rows = [
      {},
      {},
      {}
    ];
  }

  $scope.sumDebit = function(voucher){
    var sum = 0;
    for(var i = 0; i<voucher.voucher_rows.length; i++){
      sum += +parseFloat(voucher.voucher_rows[i].debit, 10).toFixed(2);
    }
    return sum;
  };

  $scope.sumCredit = function(voucher){
    return -123;
  };

  $scope.accountName = function(account){
    return account;
  };

  $scope.cancel = function(){
    $state.transitionTo("vouchers");
  };

  $scope.submit = function(){
    if($scope.voucherId){
      $scope.voucher.$update(function(response){
        $state.transitionTo('vouchers');
      }, function(response){
        $scope.start_date_errors = response.data.start_date;
        $scope.end_date_errors = response.data.end_date;
      });
    }else{
      $scope.voucher.$save(function(response){
        $state.transitionTo('vouchers');
      }, function(response){
        $scope.start_date_errors = response.data.start_date;
        $scope.end_date_errors = response.data.end_date;
      });
    }
  };
})
.factory( 'VoucherRes', function ( $resource, CompanyService, FiscalService)  {
  return $resource('../companies/:cid/fiscal_years/:fid/vouchers/:id.json', {fid: FiscalService.currentFiscalYearId(), cid: CompanyService.currentCompanyId(), id:'@id'}, {'update': {method: 'PATCH'}});
})
.directive('currencyInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/,/g, '.');
                value = value.replace(/(\d*\.\d\d)(.*)/, '$1');
                //$element.val($filter('number')(value, false));
                $element.val(value);
            };
            
            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/,/g, '');
            });
            
            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('number')(ngModelCtrl.$viewValue, false));
            };
            
            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return ;
                }
                if (event.keyCode == 188)
            {
            }
                  
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });
            
            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }
    };
})
;
