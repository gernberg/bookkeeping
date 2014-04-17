angular.module( 'bookie', [
  'templates-app',
  'templates-common',
  'common.auth',
  'bookie.home',
  'bookie.about',
  'bookie.account',
  'bookie.company',
  'bookie.devise',
  'bookie.dashboard',
  'ui.state',
  'ui.route',
  'LocalStorageModule'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ($http, $rootScope, $location, localStorageService, $state) {
  // makes sure we have a fresh CSRF cookie
  $rootScope.companyId = localStorageService.get('companyId');
  $rootScope.$on('$stateChangeStart', function(event, nextState, currentState){
    console.log(nextState);
    if(nextState.name != "companies" && $rootScope.companyId == 3){
      console.log("what");
      console.debug('Could not change route! Not authenticated!');
      $rootScope.$broadcast('$stateChangeError');
      event.preventDefault();
      $state.transitionTo('companies');
    }
  });
  /*
   $rootScope.$on('$locationChangeStart', function(event, newUrl){
    console.log(newUrl, event);
    onRouteChangeOff(); //Stop listening for location changes
    if($rootScope.companyId  == null){
      $location.path("/companies"); //Go to page they're interested in
    }else{
      $location.path(newUrl); //Go to page they're interested in
    }
    event.preventDefault();
    return;
  });
  */

  setInterval(function(){
    $http({method: 'GET', url: '/?authCookie'});
  }, 30000);
  $http({method: 'GET', url: '/?authCookie'});
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | TDDD27 Bookie' ;
    }
  });
})
.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter, {'event': event});
        });

        event.preventDefault();
      }
    });
  };
})
.directive('areaChart', function(){
  return{
    restrict: 'E',
link: function(scope, elem, attrs){

  var chart = null;


  var stack = true,
bars = true,
lines = 0,
steps = true;
var options = {
  series: {
    stack: stack,
lines: {
  show: lines,
fill: true,
steps: steps
},
bars: {
  show: bars,
  barWidth: 0.6
}
}
};

var data = scope[attrs.ngModel];            

// If the data changes somehow, update it in the chart
scope.$watch(attrs.ngModel, function(v){
  if(!chart){
    chart = $.plot(elem, v , options);
    elem.show();
  }else{
    chart.setData(v);
    chart.setupGrid();
    chart.draw();
  }
});
}
};
})
.directive('pieChart', function(){
  return{
    restrict: 'E',
  link: function(scope, elem, attrs){

    var chart = null;
    var options = {
      series: {
        pie: {
          innerRadius: 0.4,
  show: true,
  startAngle: 1
        }
      },
  legend: {
    show: false
  }
    };

    var data = scope[attrs.ngModel];            

    // If the data changes somehow, update it in the chart
    scope.$watch(attrs.ngModel, function(v){
      if(!chart){
        chart = $.plot(elem, v , options);
        elem.show();
      }else{
        chart.setData(v);
        chart.setupGrid();
        chart.draw();
      }
    });
  }
  };
})
.directive('barsChart', function ($parse) {
  //explicitly creating a directive definition variable
  //this may look verbose but is good for clarification purposes
  //in real life you'd want to simply return the object {...}
  var directiveDefinitionObject = {
    //We restrict its use to an element
    //as usually  <bars-chart> is semantically
    //more understandable
    restrict: 'E',
//this is important,
//we don't want to overwrite our directive declaration
//in the HTML mark-up
replace: false,
//our data source would be an array
//passed thru chart-data attribute
scope: {data: '=chartData'},
link: function (scope, element, attrs) {
  //in D3, any selection[0] contains the group
  //selection[0][0] is the DOM node
  //but we won't need that this time
  //          
  var chart = d3.select(element[0]);
  var svg = chart.append("svg");
  scope.$watch(function(){
    return angular.element(window)[0].innerWidth;
  }, function(){
    return scope.render(scope.data);
  }
  );

  // watch for data changes and re-render
  scope.$watch('data', function(newVals, oldVals) {
    return scope.render(newVals);
  }, true);
  scope.render = function(data){
    svg.selectAll('*').remove();
    var width, height, max;
    width = d3.select(element[0])[0][0].offsetWidth - 20;
    // 20 is for margins and can be changed
    height = width;
    //data.length * 35;
    var radius = Math.min(width, height) / 2;
    var color = d3.scale.ordinal()
      .range(["#f00", "#f90", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    svg
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .append('g');
    //to our original directive markup bars-chart
    //we add a div with out chart stling and bind each
    //data entry to the chart


    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 60)

      ;


    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });

    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .on("click", function(d) {
        d.startAngle=1;
        scope.$apply();
        d.startAngle=1;
      })
    .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.value); });

    g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .style("fill", "#000")
      .text(function(d) { return d.data.label; });

  };
  //a little of magic: setting it's width based
  //on the data value (d) 
  //and text all with a smooth transition
} 
};
return directiveDefinitionObject;
});

