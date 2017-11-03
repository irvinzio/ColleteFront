(function(){
    'use strict';
    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
        .when('/Ingredient', {
          templateUrl: '../views/Ingredient.html',
          controller: 'IngredientCtrl as vm',
        })
      }]);
    
    app.controller('IngredientCtrl',Ingredient);

    Ingredient.$inject=['$scope', '$rootScope','IngredientService','$timeout','JsPopup'];

    function Ingredient($scope, $rootScope,IngredientService,$timeout,JsPopup){
        var vm = this;
        vm.IngredientSelected = undefined

        
        vm.GetIngredientByName = function(name){ 
            IngredientService.getIngredientByName(name).then(function(response) {
                vm.Ingredients = [];
                response.data.forEach(function(data) {
                    vm.Ingredients.push(data);
                  });        
            },function (error){
              //vm.error("error geting ingredients");
              console.log(error);
            });
        };
        vm.UpdateInfo = function (data){
            vm.IngredientSelected = data;
        };
    }    
})();