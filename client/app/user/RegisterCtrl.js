'use strict';
var RegisterCtrl = function($scope, $http, $location,bamnCookies) {
	$scope.master= {};
	$scope.result = {};
	$scope.success = false;
	$scope.step = 'step1';

	$scope.add = function(user) {
		//$scope.master = angular.copy(user); is used to populate data
		//that you received from the api
		$scope.master.email = user.email;
		$scope.master.password = user.password;
		$scope.master.creationDate = (new Date()).toString();
		$scope.user = {};
		//these are for resetting the fields, needs
		//better way to handle this.
		$scope.user.passwordVerify ="";
		$scope.user.passwordVerify.$pristine = true;
		$scope.user.passwordVerify.$dirty = false;
		$http.put('/api/users', $scope.master).
			success(function(data, status, headers, config) {
				$scope.result = data.id;
				console.log("id:" + $scope.result)
				$scope.success = true;
				bamnCookies.createCookie("userID", $scope.result, 1);
				$scope.step = 'step2';
			}).
			error(function(data, status, headers, config) {
				$scope.result = 'Error! ' + data;
			});
	};

$scope.update = function(user) {
		$scope.master._id = bamnCookies.readCookie("userID");
		$scope.master.firstName = user.firstName;
		$scope.master.lastName = user.lastName;
		$scope.master.securityQuestion = user.securityQuestion;
		$scope.master.securityAnswer = user.securityAnswer;
		$scope.master.isDoctor = user.isDoctor;
		$scope.user = {};
		$http.post('/api/users/' + bamnCookies.readCookie("userID"), $scope.master).
			success(function(data, status, headers, config) {
				$scope.result = data;
				$scope.success = true;
			}).
			error(function(data, status, headers, config) {
				$scope.result = 'Error! ' + data;
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
RegisterCtrl.$inject = ['$scope','$http','$location','bamnCookies'];