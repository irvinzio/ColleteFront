// app.service('UsersService',['$http', '$q','Constants', function($http, $q,Constants) {
//   return {
//     'getUsers': function() {
//       var defer = $q.defer();
//       $http.get(Constants.BaseUrl+'/recipe/setRecipe').success(function(resp){
//         defer.resolve(resp);
//       }).error( function(err) {
//         defer.reject(err);
//       });
//       return defer.promise;
      
//     },
//      'getUser': function(id) {
//       var defer = $q.defer();
//       $http.get('/api/Users/'+id).success(function(resp){
//         defer.resolve(resp);
//       }).error( function(err) {
//         defer.reject(err);
//       });
//       return defer.promise;
//     },
//     'addUser': function(data) {
//       var defer = $q.defer();
//       $http.post('/api/Users', data).success(function(resp){
//         defer.resolve(resp);
//       }).error( function(err) {
//         defer.reject(err);
//       });
//       return defer.promise;
//     },
//     'removeUser': function(id) {
//       var defer = $q.defer();
//       $http.delete('/api/Users/'+id).success(function(resp){
//         defer.resolve(resp);
//       }).error( function(err) {
//         defer.reject(err);
//       });
//       return defer.promise;
//     },
//     'updateUser': function(data) {
//       var defer = $q.defer();
//       $http.put('/api/Users/'+data.id,data).success(function(resp){
//         defer.resolve(resp);
//       }).error( function(err) {
//         defer.reject(err);
//       });
//       return defer.promise;
//     }
// }});