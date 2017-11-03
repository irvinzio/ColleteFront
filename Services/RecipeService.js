app.service('RecipeService',function($http, $q,Constants) {
  var baseurl = Constants.BaseUrl;
  return {
    'addRecipe': function(data) {
      var defer = $q.defer();
      $http.post(baseurl+'/recipe/setRecipe', data).then(function(resp){
        defer.resolve(resp);
      },function(err) {
        console.log(err);
        defer.reject(err);
      });
      return defer.promise;
    },
}});