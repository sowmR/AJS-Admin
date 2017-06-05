var app = angular.module("paymentApp", ["ngRoute"]);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/payment', {
        title : 'Payment',
        robots : 'follow,index',
        description : 'This site is a single page AngularJS app. It\'s intended to test whether search engines can crawl and adequately render & index the angular pages',
        canonical : 'http://angular.sowmya.samples.com/',
        templateUrl: 'payment/payment.html',
        controller: 'FormController'
      });
}]);
app.directive( 'creditCardType', function(){
      var directive =
        { require: 'ngModel'
        , link: function(scope, elm, attrs, ctrl){

            ctrl.$parsers.unshift(function(value){// runs every value change
              scope.cardtype =
                (/^5[1-5]/.test(value)) ? "<i class='fa fa-cc-mastercard'>MasterCard</i>"
                : (/^4/.test(value)) ? "<i class='fa fa-cc-visa'>Visa</i>"
                : (/^3[47]/.test(value)) ? "<i class='fa fa-cc-amex'>American Express</i>"
                : (/^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/.test(value)) ? "<i class='fa fa-cc-discover'>Discover</i>"
                : undefined
              ctrl.$setValidity('invalid',!!scope.cardtype)
              
              return value
            })
          }
        }
      return directive
      }
    );
app.directive( 'cardExpiration', function(){
      var directive ={ require: 'ngModel'
        , link: function(scope, elm, attrs, ctrl){
            scope.$watch('[card.month,card.year]',function(value){
              ctrl.$setValidity('invalid',true);
              if ( scope.card.year<= scope.currentYear && scope.card.month<= scope.currentMonth) {
                ctrl.$setValidity('invalid',false);
              }else if ((scope.card.month<=12 || scope.card.month!=0)&& scope.card.year > scope.currentYear){
                ctrl.$setValidity('invalid',true);
              }
             // console.log(ctrl.$valid);
              return value;
            },true);
          }
        }
      return directive
      }
    );
app.filter( 'range', function() {
      var filter = 
        function(arr, lower, upper) {
          for (var i = lower; i <= upper; i++) arr.push(i)
          return arr
        }
      return filter;
    });
app.controller('FormController', ['$scope','$locale', function($scope,$locale) {
   /* $scope.paymentForm = {};

    $scope.cardDetails = {
      cardNumber: '',
      nameOnCard: '',
      cvc: '',
      expiryMonth: '',
      expiryYear: ''
    };*/
    $scope.card={};
    $scope.currentYear = new Date().getFullYear();
    $scope.currentYear=(($scope.currentYear)%1000)%100;
    $scope.currentMonth = new Date().getMonth() + 1;
    $scope.months = $locale.DATETIME_FORMATS.MONTH;
    $scope.ccinfo = {type:undefined};
    $scope.save = function(data){
        if ($scope.paymentForm.$valid){    
          $scope.payment_result="Payment Success..";
      }else{
          $scope.payment_result="Payment Failed...";
      }

      }
    $scope.payment_result="Fill the form and press submit";
    var defaultFormat = /(\d{1,4})/g;
    var defaultInputFormat =  /(?:^|\s)(\d{4})$/;
    $scope.invalidCard;

    $scope.buttonClicked; // state of button click
     var isvalidcvc=function(){
        if (($scope.card.cvc==null)||($scope.card.cvc.length==0)||($scope.card.cvc.length>3)){
            return false;
        }
        if ('\d{3})$/'.test($scope.card.cvc)){
            return true;
        }else
        {
        return false;}
    }
    
    $scope.buttonClick = function() {
      // handle button click here
      alert('entered= card=',isvalidcard($scope.card.number),"expiry-date =",isvalidmonth," / ",isvalidyear,' CVC= ',isvalidcvc);
      if (!isvalidcard($scope.card.number) ||!isvalidmonth|| !isvalidyear || !isvalidcvc || ($scope.card.name=null))
      {    
          $scope.payment_result="Payment Failed..";
      }else{
          $scope.payment_result="Payment Success...";
      }

  }
}]);
