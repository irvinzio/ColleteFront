app.service('IngredientService', function($http, $q) {
  var baseUrl = 'http://localhost:3000';
  return {
    'getIngredient': function() {
      var defer = $q.defer();
      $http.get(baseUrl+'/recipe/getIngredient').then(function(resp){
        defer.resolve(resp);
      },function (error){
          defer.reject(error);
      });
      return defer.promise;
      
    },
    'getIngredientNamesByName': function(name) {
      var defer = $q.defer();
      $http.get(baseUrl+'/recipe/getIngredients?name='+name).then(function(resp){
          defer.resolve(resp);
      },function (error){
          console.log(error);
          defer.reject(error);
      });
      return defer.promise;
      
    },
    'getIngredientByName': function(name) {
      var defer = $q.defer();
      $http.get(baseUrl+'/recipe/getIngredient?name='+name).then(function(resp){
          defer.resolve(resp);
      },function (error){
          console.log(error);
          defer.reject(error);
      });
      return defer.promise;
      
    },
    'getIngredientProperties': function() {
      var defer = $q.defer();
      var IgredientProperties = {
          portion: 0,
          grossWeight: 0,
          netWeight: 0,
          energyK: 0,
          energyJ: 0,
          protein: 0,
          lipids: 0,
          carbohydrates: 0,
          fiber: 0,
          saturatedAG: 0,
          monoAG: 0,
          poliAG: 0,
          cholesterol: 0,
          vitaminA: 0,
          ascorbicAcid: 0,
          folicAcid: 0,
          calcium: 0,
          iron: 0,
          sodium: 0,
          potassium: 0,
          sugarG: 0,
          glycemicIndex: 0,
          glycemicLoad:0,
          selenium: 0,
          ethanol: 0,
          posphorus: 0
      }
      defer.resolve(IgredientProperties);
      return defer.promise;  
    }
}});