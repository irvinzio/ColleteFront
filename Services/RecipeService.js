app.service('RecipeService',function($http, $q,Constants) {
  return {
    'addRecipe': function(data) {
      var defer = $q.defer();
      $http.post(Constants.BaseUrl+'/recipe/setRecipe', data).then(function(resp){
        defer.resolve(resp);
      },function(err) {
        console.log(err);
        defer.reject(err);
      });
      return defer.promise;
    },
}});