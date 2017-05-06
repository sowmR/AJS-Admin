'use strict';

angular.module('myApp.chart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chartlist', {
    templateUrl: 'chartlist/chartlist.html',
    controller: 'ChartlistCtrl'
  });
}])


.controller('ChartlistCtrl', ["$scope","$interval","$timeout","$http",function($scope,$interval,$timeout,$http) {
  var CSVToArray=function(strData, strDelimiter) {
      // Check to see if the delimiter is defined. If not,
      // then default to comma.
      strDelimiter = (strDelimiter || ",");
      // Create a regular expression to parse the CSV values.
      var objPattern = new RegExp((
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
      // Create an array to hold our data. Give the array
      // a default empty first row.
      var arrData = [[]];
      // Create an array to hold our individual pattern
      // matching groups.
      var arrMatches = null;
      // Keep looping over the regular expression matches
      // until we can no longer find a match.
      while (arrMatches = objPattern.exec(strData)) {
          // Get the delimiter that was found.
          var strMatchedDelimiter = arrMatches[1];
          // Check to see if the given delimiter has a length
          // (is not the start of string) and if it matches
          // field delimiter. If id does not, then we know
          // that this delimiter is a row delimiter.
          if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
              // Since we have reached a new row of data,
              // add an empty row to our data array.
              arrData.push([]);
          }
          // Now that we have our delimiter out of the way,
          // let's check to see which kind of value we
          // captured (quoted or unquoted).
          if (arrMatches[2]) {
              // We found a quoted value. When we capture
              // this value, unescape any double quotes.
              var strMatchedValue = arrMatches[2].replace(
              new RegExp("\"\"", "g"), "\"");
          } else {
              // We found a non-quoted value.
              var strMatchedValue = arrMatches[3];
          }
          // Now that we have our value string, let's add
          // it to the data array.
          arrData[arrData.length - 1].push(strMatchedValue);
      }
      // Return the parsed data.
      return (arrData);
  };

  $scope.csvdata=[];
	//barchart
	var data={
		labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
		series:[[100,38,77,23,65,34,67,23,45,56,23,10],
            [20,40,30,10,15,20,45,60,72,60,50,63]]
	}
	var options = {
  		fullWidth: true,
  		height: 220,
      chartPadding: {
        right: 40
      },
      classNames: {
        label: 'Chartlabel',
        bar: 'ct-bar'
      }

		};
  var lineoptions={
    fullWidth: true,
  chartPadding: {
    right: 40
  }
};
	var responsiveOptions = [
  ['screen and (min-width: 641px) and (max-width: 1024px)', {
    showPoint: false,
    lineSmooth: false
  }],
  ['screen and (max-width: 640px)', {
    showLine: false,
    axisX: {
      labelInterpolationFnc: function(value) {
        return 'W' + value;
      }
    }
  }]
];
var generatemonthlyrecord=function(csvdata){
       var monthrecord=[0,0,0,0,0,0,0,0,0,0,0,0];
       var ind=0;
       var keylist=[];
       keylist=csvdata[0];
       console.log("CSV Key List -- ",keylist);
       angular.forEach(csvdata,function(value,key){
        if (ind==0){ind++;}
        else{
          monthrecord[value[0]]=parseFloat(value[4])+parseFloat(value[5])+parseFloat(value[6])+parseFloat(value[7]);
        }
       });
       console.log(monthrecord);
       return monthrecord;
};
  
/*  $http.get('/asset/download.csv').then(function(response){
    $scope.csvdata=CSVToArray(response.data);
    console.log("csvdata recieved");
    data.series[0]=generatemonthlyrecord($scope.csvdata);
  });
	
  */
  new Chartist.Bar('#chart1', data, options,responsiveOptions);
  new Chartist.Line('#chart2', data, lineoptions,responsiveOptions);
	

  // pie chart
var piedata={
  labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  series:data.series[0]
}
var pieoptions = {
  chartPadding: 20,
  labelOffset: 50,
  labelDirection: 'explode'

};

var pieresponsiveOptions = [
  ['screen and (min-width: 640px)', {
    chartPadding: 30,
    labelOffset: 100,
    labelDirection: 'explode',
    labelInterpolationFnc: function(value) {
      return value;
    }
  }],
  ['screen and (min-width: 1024px)', {
    labelOffset: 80,
    chartPadding: 20
  }]
];
new Chartist.Pie('#chart3', piedata,pieoptions,pieresponsiveOptions);
var donutoptions={
  donut:true,
  donutWidth:20,
  startAngle: 270
}
//animated pie
new Chartist.Pie('#chart4',piedata,donutoptions);


}]);