app.service('IngredientService', function($http, $q,Constants) {
  var baseUrl = Constants.BaseUrl;
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
    'getIngredientById': function(id) {
      var defer = $q.defer();
      $http.get(baseUrl+'/recipe/getIngredient?id='+id).then(function(resp){
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
    },
    'getIngredientPorpertiesDisplayName': function(){
        var defer = $q.defer();
        var IgredientProperties = {
            portion : 
            {                
                'displayName': 'porcion'
            },
      
            grossWeight:
            {                
                'displayName': 'Peso Bruto'
            },
            netWeight:{                
                'displayName': 'Peso Neto'
            },
            energyK:{                
                'displayName': 'Energia K'
            },
            energyJ:{                
                'displayName': 'Energia J'
            },         
            protein:{                
                'displayName': 'Proteina'
            },            
            lipids :{                
                'displayName': 'Lipidos'
            },           
            carbohydrates :{
                
                'displayName': 'Carbohidratos'
            },            
            fiber:{                
                'displayName': 'Fibra'
            },            
            saturatedAG :{
                
                'displayName': 'AG Saturado'
            },            
            monoAG:{                
                'displayName': 'Mono AG'
            },
            poliAG:{                
                'displayName': 'Poli AG'
            },            
            cholesterol:{                
                'displayName': 'colesterol'
            },            
            vitaminA:{                
                'displayName': 'Vitamina A'    
            },
            ascorbicAcid:{                
                'displayName': 'ácido ascórbico'    
            },
            folicAcid:{                
                'displayName': 'Acido Folico'
            },          
            calcium:{                
                'displayName': 'Calcio'
            },           
            iron:{                
                'displayName': 'Hierro'
            },           
            sodium:{                
                'displayName': 'Sodio'
            },           
            potassium:{                
                'displayName': 'Potasio'
            },           
            sugarG:{                
                'displayName': 'Azucar G'
            },            
            glycemicvalue :{                
                'displayName': 'Nivel de Glucosa'
            },
            glycemicIndex :{
                'displayName': 'Indice glicemico'
            },         
            glycemicLoad:{                
                'displayName': 'Carga glicemica'
            },            
            selenium:{                
                'displayName': 'Selenio'
            },            
            ethanol:{                
                'displayName': 'Etanol'
            },            
            posphorus:{                
                'displayName': 'fósforo'
            }  
        }     
        defer.resolve(IgredientProperties);
        return defer.promise;
    }
}});