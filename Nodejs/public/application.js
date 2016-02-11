'use strict';


var myapp = angular.module('myapp', []); //ทำงานในส่วนของกรอบของ app ที่เรากำหนด
myapp.controller('showdatacontroller', function ($scope, $http) { //แสดงข้อมูลสินค้าใน controller ชื่อ showdatacontroller
    var url = '/admin/topic'
    console.log("data angula :");
    getData(); //ทำงานเมื่อเพจโหลด เรียกใช้ฟังก์ชั่น getData
    $scope.sData='';
    
    


    function getData() { //สร้างฟังก์ชั่น getData เพื่อแสดงรายการสินค้า
        $http.get(url).success(function (data) {
            
            $scope.showData = data;
        });
    }
        $scope.filter2 = function(field1, field2) {
      if(field2 === "" || field2 === null) return true;
      return field1 === field2;
    };
});



//var mainAppModule = angular.module('Hello', []);

myapp.filter('sayhello', function () {

    return function (name) {
        return 'Hello, ' + name;
    };
});


 myapp.controller('ExampleController', ['$scope', '$window', function($scope, $window) {
      $scope.greeting = 'Hello, World!';
      $scope.doGreeting = function(greeting) {
        if (confirm("Press a button!") == true) {
           $window.alert(greeting);
           
        } else {
             $window.location.href = 'http://www.google.com';
        }
        
      };
    }]);