angular.module('starter.services', [])

.factory('PostType', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var postTypes = [{
    name: 'yesterday',
    nameCn: '昨日更新'
  }, {
    name: 'recent',
    nameCn: '今日热门'
  }, {
    name: 'archive',
    nameCn: '历史精华'
  }];

  return {
    getNameCn: function(name) {
      for (var i = 0; i < postTypes.length; i++) {
        if (postTypes[i].name === name) {
          return postTypes[i].nameCn;
        }
      }
      return "";
    }
  };
});
