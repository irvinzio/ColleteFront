app.service('BussinesService', function($http, $q) {
    var baseUrl = 'http://localhost:3000';
    return {
      'GetBussines': function() {
        var defer = $q.defer();
          defer.resolve([{'id': 1, name : 'Restaurant1'}]);
        return defer.promise;
      }    
  }});