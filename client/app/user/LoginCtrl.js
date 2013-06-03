'use strict';

var LoginCtrl = function($scope, $http, $location, bamnCookies) {
  $scope.master= {};
  $scope.result = {};
  $scope.success = false;

  $scope.authenticate = function(user) {
    //$scope.master = angular.copy(user);
    $scope.master.email = user.email;
    $scope.master.password = user.password;
    $scope.user = {};
    //these are for resetting the fields, needs
    //better way to handle this.
    $scope.login.$pristine = true;
    $scope.login.$dirty = false;
    $scope.login.email.$pristine = true;
    $scope.login.email.$dirty = false;
    $http.post('/api/auth', $scope.master).
      success(function(data, status, headers, config) {
        $scope.result = data;
        $scope.success = true;
        var days=1;
        if($scope.login.rememberMe) days =100;
        bamnCookies.createCookie("user", $scope.result.user, days);
      }).
      error(function(data, status, headers, config) {
        $scope.status = status;
        $scope.error = true;
        if (status == 401)
        {
          $scope.errorMsg = "Invalid credentials";
        }
        else
        {
          $scope.errorMsg = 'Error! ' + data;
        }
      });
  };

  $scope.reset = function() {
  $scope.user = angular.copy($scope.master);
  };

  $scope.isUnchanged = function(user) {
  return angular.equals(user, $scope.master);
  };

  $scope.getResult = function(user) {
  return $scope.result;
  };

   $scope.reset();
}
LoginCtrl.$inject = ['$scope','$http','$location','bamnCookies'];