'use strict'

angular.module('starter.controllers')
  .controller('ArticleDetailCtrl', function($scope, $stateParams, $http) {
    $http({
      method: "GET",
      url: "http://api.kanzhihu.com/getpostanswers/" + $stateParams.articleId
    })
    .success(function(response, status, headers, config){
      $scope.answers = response.answers;
    })
    .error(function(response, status, headers, config){
      console.log(response);
    });

    $scope.openLink = function(questionId, answerId) {
      window.open("https://www.zhihu.com/question/" + questionId + "/answer/" + answerId);
    }
});
