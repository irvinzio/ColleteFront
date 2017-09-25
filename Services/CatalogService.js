app.service('CatalogService', function($http, $q) {
    var baseUrl = 'http://localhost:3000';
    return {
      'getCatalog': function() {
        var defer = $q.defer();
        $http.get(baseUrl+'/catalog/getCatalog').then(function(resp){
          defer.resolve(resp);
        },function (error){
            defer.reject(error);
        });
        return defer.promise;    
      }
  }});