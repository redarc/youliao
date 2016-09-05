'use strict'

var app = angular.module('starter');

app.directive("excerpt", function() {
  return {
    template: '<div ng-model="value" ng-repeat="title in titles">\
                 {{title}}<br>\
               </div>',
    scope: {
      value: "@",
    },
    restirct: "EA",
    controller: function($scope) {
      var titles = $scope.value.split("、");
      titles[0] = titles[0].substring[3];
      // titles.splice(0, 1, "摘录了");
      var lastTitles= titles[titles.length - 1].split("等问题");
      titles[titles.length - 1] = lastTitles[0];
      // titles.push("等问题" + lastTitles[1]);
      $scope.titles = titles;
    },
    link: function(scope, element, attrs) {
      //none
    }
  };
});
