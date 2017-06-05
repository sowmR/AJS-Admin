'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'angular-chartist',
  'ngAnimate',
  'ngSanitize', 
  'ui.bootstrap',
  'uiGmapgoogle-maps',
  'ngTouch',
  'myApp.dashboard',
  'myApp.chart',
  'myApp.HTTP',
  'myApp.login',
  'myApp.register',
  'paymentApp',
  'myApp.version'
]).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}])
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});
