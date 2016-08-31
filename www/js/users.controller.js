'use strict'

angular.module('starter.controllers')
  .controller('UsersCtrl', function($scope, $http, $ionicTabsDelegate) {
  $scope.keywords = "";
  requestTopUsers("answer");

  $scope.goForward = function () {
     var selected = $ionicTabsDelegate.selectedIndex();
     if (selected != -1) {
         $ionicTabsDelegate.select(selected + 1);
     }
  }

  $scope.goBack = function () {
     var selected = $ionicTabsDelegate.selectedIndex();
     if (selected != -1 && selected != 0) {
         $ionicTabsDelegate.select(selected - 1);
     }
  }

  $scope.goForward = function () {
     var selected = $ionicTabsDelegate.selectedIndex();
     // if (selected != -1) {
         $ionicTabsDelegate.select(selected + 1);
     // }
  }

  $scope.goBack = function () {
     var selected = $ionicTabsDelegate.selectedIndex();
     if (selected != -1 && selected != 0) {
         $ionicTabsDelegate.select(selected - 1);
     }
  }

  $scope.searchUser = function(){
    console.log($scope.keywords);
  }

  function requestTopUsers(value) {
    $http({
      method: "GET",
      url: "http://api.kanzhihu.com/topuser/" + value
    })
    .success(function(response, status, headers, config) {
      $scope.users = response.topuser;
    })
    .error(function(response, status, headers, config){
      console.error(response);
    });
  }
});
