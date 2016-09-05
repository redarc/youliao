'use strict'

var app = angular.module('starter');

app.filter('formatExcerpt', function() {
  return function(excerpt) {
    var excerptArr = excerpt.split("、");
    var result = "";
    for(var i=0; i<excerptArr.length; i++) {
      result += excerptArr[i] + "<br>";
    }
    return excerptArr;
  }
});

app.filter('formatPostType', function(PostType) {
  return function(name) {
    return PostType.getNameCn(name);
  }
});
