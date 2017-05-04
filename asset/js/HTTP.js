'use strict';

angular.module('myApp.HTTP', ['ngRoute','ui.grid','ui.grid.edit','ui.grid.cellNav','ui.grid.importer', 'ui.grid.selection', 'ui.grid.exporter'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/HTTP', {
    templateUrl: 'HTTP/HTTP.html',
    controller: 'HTTPCtrl'
  });
}])
.controller('HTTPCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
	$scope.data = [];
	$scope.gridOptions = {
	    enableGridMenu: true,
	    enableCellEdit:true,
	    enableCellEditOnFocus:true,
	    data: 'data',
	    importerDataAddCallback: function ( grid, newObjects ) {
	      $scope.data = $scope.data.concat( newObjects );
	    },
	    exporterPdfDefaultStyle: {fontSize: 9},
    	exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    	exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
    	exporterPdfOrientation: 'portrait',
    	exporterPdfPageSize: 'LETTER',
    	exporterPdfMaxGridWidth: 500,
    	exporterHeaderFilter: function( displayName ) { 
	        return displayName;
	    },
	    exporterFieldCallback: function( grid, row, col, input ) {
	    	return input;
	    },
	    onRegisterApi: function(gridApi){
	      $scope.gridApi = gridApi;
	    }
	 };

	$scope.export = function(){
    if ($scope.export_format == 'csv') {
      var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
      $scope.gridApi.exporter.csvExport( $scope.export_row_type, $scope.export_column_type, myElement );
    } else if ($scope.export_format == 'pdf') {
      $scope.gridApi.exporter.pdfExport( $scope.export_row_type, $scope.export_column_type );
    };
  };

}]);