'use strict'

angular.module('starter.controllers')
  .controller('UserDetailCtrl', function($scope, $http, $stateParams) {
  requestUserDetail();

  function requestUserDetail() {
    $http({
      method: "GET",
      url: "http://api.kanzhihu.com/userdetail2/" + $stateParams.userHash
    })
    .success(function(response, status, headers, config) {
      $scope.user = response;
      $scope.trend = response.trend;
      $scope.topanswers = response.topanswers;
    })
    .error(function(response, status, headers, config){
      console.error(response);
    });
  }

  $scope.openLink = function(link) {
    window.open("https://www.zhihu.com" + link);
  }

});
