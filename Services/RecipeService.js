app.service('RecipeService', function($http, $q) {
  var baseUrl = 'http://localhost:3000';
  return {
    'getRecipe': function() {
      var defer = $q.defer();
      $http.get('/api/Recipe').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
      
    },
     'getRecipeById': function(id) {
      var defer = $q.defer();
      $http.get('/api/Recipe/'+id).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'addRecipe': function(data) {
      var defer = $q.defer();
      $http.post(baseUrl+'/recipe/setRecipe', data).then(function(resp){
        defer.resolve(resp);
      },function(err) {
        console.log(err);
        defer.reject(err);
      });
      return defer.promise;
    },
    'removeRecipe': function(id) {
      var defer = $q.defer();
      $http.delete('/api/Recipe/'+id).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'updateRecipe': function(data) {
      var defer = $q.defer();
      $http.put('/api/Recipe/'+data.id,data).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}});