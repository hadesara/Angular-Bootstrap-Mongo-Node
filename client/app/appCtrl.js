'use strict';
function AppCtrl($scope, $http) {
	console.log("Inside controller");
  $http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!';
  });
}
AppCtrl.$inject = ['$scope','$http'];