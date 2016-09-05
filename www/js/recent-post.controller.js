'use strict'

angular.module('starter.controllers')
  .controller('RecentPostsCtrl', function($scope, $http, $cordovaSQLite, $ionicTabsDelegate, $ionicLoading) {
  $ionicLoading.show({template: 'Loading...'});
  requestPosts();

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMoreData();
  });

  $scope.$on('$ionicView.enter', function(e) {
    console.log('>> enter again recent page');
  });

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

  $scope.loadMoreData = function () {
    var articles = $scope.articles;
    var latestPublishTime = "";
    if(articles) {
      latestPublishTime = articles[articles.length-1].publishtime;
    }

    $http({
      method: "GET",
      url: "http://api.kanzhihu.com/getposts/" + latestPublishTime
    })
    .success(function(response, status, headers, config) {
      $scope.articles = $scope.articles.concat(response.posts);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    })
    .error(function(response, status, headers, config){
      console.error(response);
    });
  }

  // readPosts(function(data) {
  //   if(data.length > 0) {
  //     console.log("cached data");
  //     var latestPublishTime = data[data.length-1].publishtime;
  //     checkNew(latestPublishTime, function(response) {
  //       if(response.result) {
  //         console.log("checnew is true")
  //         requestPosts();
  //       } else {
  //         console.log("checnew none update");
  //         $scope.articles = data;
  //       }
  //     });
  //   } else {
  //     console.log("none cached data");
  //     requestPosts();
  //   }
  // })

  function checkNew(publishtime, handleResponse) {
    $http({
      method: "GET",
      url: "http://api.kanzhihu.com/checknew/" + publishtime
    })
    .success(function(response, status, headers, config) {
      handleResponse(response);
    })
    .error(function(response, status, headers, config){
      console.error(response);
    });
  }

  //read remote posts
  function requestPosts() {
    console.log("requestPosts");
    $http({
      method: "GET",
      url: "http://api.kanzhihu.com/getposts"
    })
    .success(function(response, status, headers, config) {
      $scope.articles = response.posts;
      $ionicLoading.hide();
      // savePosts(response.posts);
    })
    .error(function(response, status, headers, config){
      console.error(response);
      $ionicLoading.hide();
    });
  }

  //refine
  function savePosts(data) {
    console.log("savePosts");
    _.each(data, function(item){
      var query = "INSERT INTO Posts (id, date, name, pic, publishtime, count, excerpt) VALUES (?,?,?,?,?,?,?) ";
      $cordovaSQLite.execute($scope.db, query, _.values(item)).then(function(res) {}, function (err) {
          console.error(err);
      });
    });
  }

  function readPosts(callback, handleError) {
    console.log("readPosts");
    var query = "SELECT * FROM Posts";
    $cordovaSQLite.execute($scope.db, query, []).then(function(res) {
      var articles = _.map(res.rows, function(item){
        return item;
      });
      callback(articles);
    }, function (err) {
      console.error(err);
      alert(err);
      handleError(err);
    });
  }
});
