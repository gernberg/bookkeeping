/**
 * Account module
 */
angular.module( 'bookie.report', [
  'ui.state',
  'ngResource',
  'ngGrid'
])
.config(function config($stateProvider){
  $stateProvider.state('reports', {
    url: '/reports',
    views: {
      "main":{
        controller: "ReportsController",
        templateUrl: "report/reports.tpl.html"
      }
    },
    data:{pageTitle: "Reports"}
  });
})
.controller( 'ReportsController', function CompaniesController( $scope, CompanyRes, $state, $rootScope, CompanyService, AccountRes, VoucherRes, FiscalService) {
  $rootScope.loggedIn = true;
  $scope.accounts = AccountRes.query({cid: CompanyService.currentCompanyId()});
  $scope.downloadReport = function(report){
    if(report == "voucherlist"){
      voucherList();
    }else if(report=="balance"){
      balance();
    }else{
      alert("Under construction");
    }
  };
  $scope.srcString = "";

  // TODO: Should be async and pretty
  var findAccount = function(account_id){
    for(var i = 0; i < $scope.accounts.length; i++){
      if($scope.accounts[i].id == account_id){
        return $scope.accounts[i];
      }
    }
  };

  var balance = function(){
    $scope.accounts = AccountRes.fiscal_year({cid: CompanyService.currentCompanyId(), fid: FiscalService.currentFiscalYearId()}, function(res){
      createBalancePDF(res);
    });
  };

  var createBalancePDF = function(res){


    // TODO: Should be moved to some admin-part
    var categories = [
      "",
      "Assets", 
      "Liabilites"
    ];


      // Fix för JSLint
      var JsPDF = jsPDF;
      var doc = new JsPDF();
      var y = 10;
      var columns = [
      10,
      30,
      70,
      130,
      160
      ];

    var width = 200;
    var rowHeight = 6; 
    y += rowHeight;
    doc.setFontType("bold");
    doc.setFontSize(22);
    doc.text(columns[0], y, "Balance report");
    doc.setFontSize(14);
    y += rowHeight*2;
    doc.text(columns[0], y, "Account");
    doc.text(columns[1], y, "");
    doc.text(columns[2], y, "");
    doc.text(columns[3], y, "");
    doc.text(columns[4], y, "Sum");
    y += 2;
    doc.setLineWidth(0.9);
    doc.line(10, y, width, y); // horizontal line
    doc.setLineWidth(0.2);

    var current_group = 0;
    var total_sum = 0;
    var group_sum = 0;
    function printGroup(group){
      y += rowHeight*2;
      doc.setFontType("bold");
      doc.text(columns[0], y, "" + categories[group]);
      doc.setFontType("normal");
      y += rowHeight;
      doc.setLineWidth(0.5);
      doc.line(10, y-rowHeight/2, width, y-rowHeight/2); // horizontal line
      doc.setLineWidth(0.2);
    }
    function printPreviousGroup(group, total_sum){
      if(group === 0){
        return false;
      }
      var lineWidth = 0.9;
      var text = "Sum";
      if(group === 9){
        lineWidth = 2;
        text = "Result";
      }
      y += rowHeight*2;
      doc.setFontType("bold");
      doc.text(columns[0], y, text);
      doc.text(columns[4], y, "" + total_sum);
      doc.setFontType("normal");
      y += rowHeight;
      doc.setLineWidth(lineWidth);
      doc.line(10, y-rowHeight/2, width, y-rowHeight/2); // horizontal line
      doc.setLineWidth(0.2);
    }
    angular.forEach(res, function(account, key){
      while(Math.floor(account.account_number/1000) != current_group){
        printPreviousGroup(current_group, group_sum);
        group_sum = 0;
        current_group++;
        if(current_group > categories.length-1){
          return false;
        }
        printGroup(current_group);
      }
      total_sum += account.sum;
      group_sum += account.sum;

      y += rowHeight;
      doc.setFontType("bold");
      doc.text(columns[0], y, "" + account.account_number);
      doc.text(columns[1], y, account.account_name);
      doc.text(columns[4], y, "" + account.sum);
      doc.setFontType("normal");
      y += rowHeight;
      doc.line(10, y-rowHeight/2, width, y-rowHeight/2); // horizontal line
    });
    printPreviousGroup(9, total_sum);

    // doc.save('BalanceReport.pdf');
    jQuery(".preview-pane").attr("src", doc.output('datauristring'));
  };

  var voucherList = function(){
    var vouchers = VoucherRes.query({cid: CompanyService.currentCompanyId(), fid: FiscalService.currentFiscalYearId()});
     vouchers.$promise.then(function(res){
      console.log(res);
      // Fix för JSLint
      var JsPDF = jsPDF;
      var doc = new JsPDF();
      var y = 10;
      var columns = [
      10,
      30,
      70,
      130,
      160
      ];

    var width = 200;
    var rowHeight = 6; 
    y += rowHeight;
    doc.setFontType("bold");
    doc.setFontSize(22);
    doc.text(columns[0], y, "Voucher list");
    doc.setFontSize(14);
    y += rowHeight*2;
    doc.text(columns[0], y, "No");
    doc.text(columns[1], y, "Date");
    doc.text(columns[2], y, "Title");
    doc.text(columns[3], y, "Debit");
    doc.text(columns[4], y, "Credit");
    y += 2;
    doc.setLineWidth(0.9);
    doc.line(10, y, width, y); // horizontal line
    doc.setLineWidth(0.2);


    angular.forEach(res.reverse(), function(voucher, key){
      console.log(voucher, voucher.voucher_rows);
      y += rowHeight;
      doc.setFontType("bold");
      doc.text(columns[0], y, "" + voucher.number);
      doc.text(columns[1], y, voucher.date);
      doc.text(columns[2], y, voucher.title);
      doc.setFontType("normal");
      y += rowHeight;
      console.log("for voucher_rows");
      for(var i = 0; i < voucher.voucher_rows.length; i++){
        console.log(i);
        var voucher_row = voucher.voucher_rows[i];
        console.log(voucher_row);
        var account = findAccount(voucher_row.account_id);
        doc.text(columns[1], y, "" + account.account_number);
        doc.text(columns[2], y, "" + account.account_name);
        if(voucher_row.debit !== null){
          doc.text(columns[3], y, "" + voucher_row.debit);
        }
        if(voucher_row.credit !== null){
          doc.text(columns[4], y, "" + voucher_row.credit);
        }
        y += rowHeight;
      }
      doc.line(10, y-rowHeight/2, width, y-rowHeight/2); // horizontal line
    });

    doc.save('VoucherList.pdf');
    // jQuery(".preview-pane").attr("src", doc.output('datauristring'));
    }, function(){
      alert("Error when retrieving vouchers");
    });
  };
});
