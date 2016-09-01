// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services',
  'ngCordova']
).run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //use inappbroswer open link
    if (window.cordova && window.cordova.InAppBrowser) {
      window.open = window.cordova.InAppBrowser.open;
    }

    //support db
    if (window.cordova) {
      var db = $rootScope.db = $cordovaSQLite.openDB({ name: "youliao.db"});
    } else {
      var db = $rootScope.db = window.openDatabase("youliao.db", "1.0", "", 1024*1024*2);
    }

    // $cordovaSQLite.execute(db, "DROP TABLE Posts");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Posts (id integer primary key, date text, name text, pic text, publishtime int, count int, excerpt text)")
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.users', {
    url: '/users',
    views: {
      'tab-users': {
        templateUrl: 'templates/tab-users.html',
        controller: 'UsersCtrl'
      }
    }
  })

  .state('tab.user-detail', {
    url: '/users/:userHash',
    views: {
      'tab-users': {
        templateUrl: 'templates/user-detail.html',
        controller: 'UserDetailCtrl'
      }
    }
  })

  .state('tab.recent-posts', {
    url: '/recent-posts',
    views: {
      'tab-recent-posts': {
        templateUrl: 'templates/tab-recent-posts.html',
        controller: 'RecentPostsCtrl'
      }
    }
  })

  .state('tab.article-detail', {
      url: '/recent-posts/:articleId',
      views: {
        'tab-recent-posts': {
          templateUrl: 'templates/article-detail.html',
          controller: 'ArticleDetailCtrl'
        }
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/users');

});
