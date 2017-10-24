app.service('BussinesService', function($http, $q) {
    return {
      'GetBussines': function() {
        var defer = $q.defer();
          defer.resolve([{'id': 1, name : 'Restaurant1'}]);
        return defer.promise;
      }    
  }});