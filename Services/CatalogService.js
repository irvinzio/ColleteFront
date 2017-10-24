app.service('CatalogService',function($http, $q,Constants) {
  var baseurl = Constants.BaseUrl;
    return {
      'getCatalog': function() {
        var defer = $q.defer();
        $http.get(baseurl+'/catalog/getCatalog').then(function(resp){
          defer.resolve(resp);
        },function (error){
            defer.reject(error);
        });
        return defer.promise;    
      }
  }});