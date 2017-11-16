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

  app.service('CategoryService', function($http, $q) {
    return {
      'GetCategories': function() {
        var defer = $q.defer();
          defer.resolve([{'id': 0, name : 'Entrada'},{'id': 1, name : 'Ensalada'},{'id': 2, name : 'Crema o Sopa'},{'id': 3, name : 'Plato Fuerte'},{'id': 4, name : 'Sopa'}]);
        return defer.promise;
      }    
  }});