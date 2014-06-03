angular.module( 'bookie.voucher', [
  'ui.state',
  'ngResource',
  'LocalStorageModule'
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
    url: '/voucher',
    views:{
      "main":{
        controller: "VoucherCtrl",
        templateUrl: "voucher/voucher.tpl.html"
      }
    },
    data: {
      pageTitle: "Voucher"
    }
  }).state('showVoucher', {
    url: '/show-voucher?voucherId',
    views:{
      "main":{
        controller: "VoucherShowCtrl",
        templateUrl: "voucher/showVoucher.tpl.html"
      }
    },
    data: {
      pageTitle: "Voucher"
    }
  });
})
.controller( 'VouchersCtrl', function VouchersController( $scope, VoucherRes, $state, $rootScope, AccountRes, FiscalService, CompanyService) {
  if(CompanyService.currentCompanyId() == null){
    return false;
  }
  if(FiscalService.currentFiscalYearId() == null){
    return false;
  }
  $rootScope.loggedIn = true;
  $scope.accounts = AccountRes.query({cid: CompanyService.currentCompanyId()});
  $scope.vouchers = VoucherRes.query({cid: CompanyService.currentCompanyId(), fid: FiscalService.currentFiscalYearId()});
  console.log($scope.vouchers);
  $scope.openVoucherByNumber = function(number){
    //VoucherRes.
  };

  $scope.newVoucher = function(){
    $state.transitionTo('voucher');
  };
  $scope.editVoucher = function(voucher){
    $state.transitionTo('showVoucher', {voucherId: voucher.id});
  };
})
.controller('VoucherShowCtrl', function VoucherCtrl($scope, VoucherRes, $state, $stateParams, $rootScope, AccountRes, VoucherCache, CompanyService, FiscalService){
  $rootScope.loggedIn = true;
  $scope.voucherId = parseInt($stateParams.voucherId, 10);
  $scope.voucher = VoucherRes.get({fid: FiscalService.currentFiscalYearId(), cid: CompanyService.currentCompanyId(), id: $scope.voucherId}, function(res){
    angular.forEach(res.voucher_rows, function(val, key){
      val.account = AccountRes.get({cid: CompanyService.currentCompanyId(), id: val.account_id});
    });
  });
  $scope.updateVoucher = function(){
    $scope.voucher.$update({cid: CompanyService.currentCompanyId(), fid: FiscalService.currentFiscalYearId()}, function(){
      $state.transitionTo('vouchers');
    }, function(error){
      if(error.data.date){
      alert("Date: " + error.data.date[0]);  
      }
      if(error.data.title){
      alert("Title: " + error.data.title[0]);  
      }
    });
  };
})
.controller('VoucherCtrl', function VoucherCtrl($scope, VoucherRes, $state, $stateParams, $rootScope, AccountRes, VoucherCache, $cacheFactory, CompanyService, FiscalService){
  $rootScope.loggedIn = true;
  $scope.editVoucher = function(voucher){
    $state.transitionTo('showVoucher', {voucherId: voucher.id});
  };
  var loadVouchers = function(){
    $scope.vouchers_loaded = false;
    $scope.vouchers = VoucherRes.query({cid: CompanyService.currentCompanyId(), fid: FiscalService.currentFiscalYearId()}, function(res){
      $scope.vouchers_loaded = true;
      if($scope.voucher.date === undefined){
        $scope.voucher.date = res[0].date;
      }
      $scope.lastVoucher = res[0];
    });
  };
  var newVoucher = function(){
    loadVouchers();
    voucher = new VoucherRes({fid: FiscalService.currentFiscalYearId(), cid: CompanyService.currentCompanyId()});
    voucher.voucher_rows = [
{},
{},
{}
];

// Focus on the title field after create
jQuery("#voucher-title").focus();
return voucher;
};

$scope.voucher = newVoucher();

  $scope.accounts = AccountRes.query({cid: CompanyService.currentCompanyId()});
console.log($scope.accounts);


// TODO Cleanup!!
$scope.sumCredit = function(voucher){
  var sum = 0;
  for(var i = 0; i<voucher.voucher_rows.length; i++){
    add = parseFloat(voucher.voucher_rows[i].credit, 10);
    if(!isNaN(add)){
      sum += add;
    }
  }
  return sum.toFixed(2);
};
$scope.sumDebit = function(voucher){
  var sum = 0;
  for(var i = 0; i<voucher.voucher_rows.length; i++){
    add = parseFloat(voucher.voucher_rows[i].debit, 10);
    if(!isNaN(add)){
      sum += add;
    }
  }
  return sum.toFixed(2);
};

$scope.checkRow = function(row, field){
  console.log("checkRow", row, field);
  // If both debit and credit is filled - clear one
  if(row.debit && row.credit){
    if(field == "debit"){
      row.credit = "";
    }else{
      row.debit = "";
    }
  } 
};


$scope.autoFillRow = function(row){
  if(!row.debit && !row.credit){
    debit = parseFloat($scope.sumDebit(voucher));
    credit = parseFloat($scope.sumCredit(voucher));
    console.log(debit, credit, debit-credit, credit-debit);
    if (debit > credit){
      row.credit = debit-credit;
      return true;
    }else if(debit < credit){
      row.debit = credit-debit;
      return true;
    }
  }
};

$scope.checkIfFilled = function(voucher){
  var voucher_rows = voucher.voucher_rows;
  var filledRows = 0;
  for(var i = 0; i < voucher_rows.length; i++){
    if(voucher_rows[i].account){
      filledRows++;
    }
  }
  if(filledRows >= voucher_rows.length){
    $scope.addVoucherRow(voucher);
  }
};

$scope.addVoucherRow = function(voucher, row){
  if(row === undefined){
    row = {};
  }
  voucher.voucher_rows.push(row);
};

$scope.accountSum = function(row){
  var account_id = $scope.findAccountId(row.account);
  account = AccountRes.get(account_id);
};

$scope.accountName = function(account){
  var account_id = $scope.findAccountId(account);
  return account_id;
};

$scope.cancel = function(){
  $state.transitionTo("vouchers");
};
$scope.removeVoucher = function(){
  alert("DELETE");
};
$scope.findAccount = function(account_number){
  for(var i = 0; i < $scope.accounts.length; i++){
    if($scope.accounts[i].account_number == account_number){
      return $scope.accounts[i].id;
    }
  }
};
$scope.findAccountId = function(account_number){
  for(var i = 0; i < $scope.accounts.length; i++){
    if($scope.accounts[i].account_number == account_number){
      return $scope.accounts[i].id;
    }
  }
};

// Finish row
$scope.finishRow = function(row){
  if(!$scope.autoFillRow(row)){
    $scope.submit();
  }
};

$scope.submit = function(){
  // reset errors
  $scope.errors = [];
  if(true){
    $scope.voucher.voucher_rows_attributes = [];
    for(var i = 0; i < $scope.voucher.voucher_rows.length; i++){
      $scope.voucher.voucher_rows_attributes.push(
          {
            account_id: $scope.findAccountId($scope.voucher.voucher_rows[i].account),
        credit: $scope.voucher.voucher_rows[i].credit,
        debit: $scope.voucher.voucher_rows[i].debit
          });
    }
    $scope.voucher.$save(function(response){
      VoucherCache.removeAll();
      $scope.voucher = newVoucher();
      $scope.lastVoucher = response;
    }, function(response){
      console.log(response.data);
      $scope.errors = response.data; 
      if($scope.errors.voucher_rows){
        angular.forEach($scope.errors.voucher_rows, function(val, key){
          alert(val);
        });
      }
    });
    return false;
  }
  $scope.voucher.$save(function(response){
    $state.transitionTo('vouchers');
  }, function(response){
    $scope.start_date_errors = response.data.start_date;
    $scope.end_date_errors = response.data.end_date;
  });
};
})
.factory( 'VoucherCache', function(localStorageService, $cacheFactory){
  var cache = $cacheFactory("VC");

  return cache;
})
.factory( 'VoucherRes', function ( $resource, CompanyService, FiscalService, VoucherCache)  {
  return $resource('../companies/:cid/fiscal_years/:fid/vouchers/:id.json', {fid: '@fid', cid: '@cid', id:'@id'}, {
    'query' : {
      method: 'GET', 
      cache: VoucherCache,
      isArray: true
    },
    'update': {
      method: 'PUT'
    }
  });
})
.directive('currencyInput', function($filter, $browser) {
  return {
    require: 'ngModel',
link: function($scope, $element, $attrs, ngModelCtrl) {
  var listener = function() {
    console.log("listener");
    var value = $element.val().replace(/,/g, '.');
    value = value.replace(/(\d*\.\d\d)(.*)/, '$1');
    $element.val($filter('number')(value, false));
    console.log($element.val(), value);
    $element.val(value);
  };

  // This runs when we update the text field
  ngModelCtrl.$parsers.push(function(viewValue) {
    return viewValue.replace(/,/g, '');
  });

  // This runs when the model gets updated on the scope directly and keeps our view in sync
  ngModelCtrl.$render = function() {
    $element.val(ngModelCtrl.$viewValue);
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
.directive('autoComplete', function($timeout) {
  var substringMatcher = function(accounts) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(accounts, function(i, account) {
        var display_name = account.account_number + " " + account.account_name;
        if (substrRegex.test(display_name)){
          matches.push({ value: ""+account.account_number, name: account.account_name });
        }
      });

      cb(matches);
    };
  };
  return function(scope, iElement, iAttrs) {
    $(iElement).typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'accounts',
      displayKey: 'value',
      source: substringMatcher(scope[iAttrs.uiItems]),
      templates:{
        suggestion: Handlebars.compile('<p><strong>{{value}}</strong> – {{name}}</p>')
      }

    });
    $(iElement).blur(function(){
      $(this).val($(this).val().substr(0,4));
      iElement.triggerHandler("change");
    });
  };
})
;
