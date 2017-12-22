app.service('RecipeService',function($http, $q,Constants) {
  var baseurl = Constants.BaseUrl;
  return {
    'addRecipe': function(data) {
      console.log(data);
      var defer = $q.defer();
      $http.post(baseurl+'/recipe/setRecipe', data).then(function(resp){
        defer.resolve(resp);
      },function(err) {
        console.log(err);
        defer.reject(err);
      });
      return defer.promise;
    },
    'uploadImage': function(file) {
      var config = { headers: { 'Content-Type': undefined },
                     transformResponse: angular.identity
                   };
      var defer = $q.defer();
      var fd = new FormData();
      fd.append('imgUploader', file[0]);
      $http.post(baseurl+'/recipe/uploadRecipe', fd,config).then(function(resp){
        defer.resolve(resp);
      },function(err) {
        console.log(err);
        defer.reject(err);
      });
      return defer.promise;
    },
}});