(function(){
    'use strict';
    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
        .when('/Recipe', {
          templateUrl: '../AddRecipe.html',
          controller: 'RecipeCtrl as vm',
        })
      }]);
    
    app.controller('RecipeCtrl',Recipe);

    Recipe.$inject=['$scope', '$rootScope','RecipeService','IngredientService','CatalogService','BussinesService','$timeout','JsPopupService'];

    function Recipe($scope, $rootScope,RecipeService,IngredientService,CatalogService,BussinesService,$timeout,JsPopupService){
        var vm = this;
        vm.IdUnitsId = 11;//13;
        vm.IdCategoryId = 12;//14;
        vm.recipeJson = {};
        vm.Ingredients = new Array();
        vm.Bussines = undefined;
        vm.Catalog = undefined;
        vm.CatalogArray = [];
        vm.IngredientSelected = undefined;
        vm.recipeJson.GetCatalog = undefined;
        vm.recipeJson.recipe = {};
        vm.recipeJson.recipe_ingredient = [];
        vm.recipeJson.recipe_procedure = [];
        vm.recipeJson.nutrition_facts = {};
        vm.StepToAdd = "";
        vm.Image = undefined;
        vm.IngredientSelected = {"carbohydrates": 0, "lipids":0, "protein":0, "energyK":0};
        var oldvalue =undefined;

        CatalogService.getCatalog().then(function(response) {
            vm.Catalog = response.data;
            vm.Catalog.forEach(function(obj) {
                if(vm.CatalogArray[obj.type] === undefined){
                    vm.CatalogArray.push(obj.type);
                    vm.CatalogArray[obj.type]=[]
                    vm.CatalogArray[obj.type].push(obj);  
                    //if(vm.CatalogArray[obj.type][obj.idType] === undefined){
                        //vm.CatalogArray[obj.type].push([obj.idType]);
                        // vm.CatalogArray[obj.type][obj.idType] =[];
                        // vm.CatalogArray[obj.type][obj.idType].push(obj);
                    //}      
                }    
                else{
                    vm.CatalogArray[obj.type].push(obj);
                    //if(vm.CatalogArray[obj.type][obj.idType] === undefined){
                        // vm.CatalogArray[obj.type].push([obj.idType]);
                        // vm.CatalogArray[obj.type][obj.idType] =[];
                        // vm.CatalogArray[obj.type][obj.idType].push(obj);  
                    //}           
                }
            });
            console.log(vm.CatalogArray);
        },function (error){
          //vm.error("error geting ingredients");
          console.log(error);
        });

        BussinesService.GetBussines().then(function(response) {
            vm.Bussines = response;    
        },function (error){
          //vm.error("error geting ingredients");
          console.log(error);
        });

        IngredientService.getIngredientProperties().then(function(response) {
            vm.recipeJson.nutrition_facts = response;  
        },function (error){
          //vm.error("error geting ingredients");
          console.log(error);
        });

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
            vm.IngredientSelected.UnitName = vm.CatalogArray[vm.IdUnitsId][data.idUnit].name;
                       
        };
        vm.UpdateIngredientInfo =  function (ingredient){
            Object.keys(vm.recipeJson.nutrition_facts)
            .forEach(function eachKey(key) {
                if(ingredient.properties[key]>0)  {
                    vm.recipeJson.nutrition_facts[key] -=  oldvalue.properties[key]*oldvalue.qty;
                    vm.recipeJson.nutrition_facts[key] += ingredient.properties[key]*ingredient.qty;
                }            
            });
        };

        vm.updateIngridientData = function (ingredient){
            ingredient.editMode = true;
            oldvalue = angular.copy(ingredient);
        };

        vm.IngridientDataCancelEditMode = function(ingredient,index) {
            vm.recipeJson.recipe_ingredient[index] = oldvalue;
            oldvalue.editMode = false;
          };

        vm.AddIngredient= function (data){
            var reqInfo = {'name': data.name,'qty':data.qty,'UnitName':data.UnitName, 'properties': data};
            vm.recipeJson.recipe_ingredient.push(reqInfo);
            Object.keys(vm.recipeJson.nutrition_facts)
            .forEach(function eachKey(key) {
                if(vm.IngredientSelected[key]>0)      
                    vm.recipeJson.nutrition_facts[key] +=  vm.IngredientSelected[key]*data.qty;
            });  
        };
        vm.AddStep= function (data){
            var reqInfo = {'description': data,'orderNo':vm.recipeJson.recipe_procedure.length + 1 };
            vm.recipeJson.recipe_procedure.push(reqInfo);
            vm.StepToAdd = "";
        };

        vm.IngredientconfirmationModal= function (ingredient,index){
            var qty = ingredient.qty;
            if(JsPopupService.confirmationJs()){
                vm.recipeJson.recipe_ingredient.splice(index, 1);
                Object.keys(vm.recipeJson.nutrition_facts)
                .forEach(function eachKey(key) {
                    if(vm.IngredientSelected[key]>0)      
                        vm.recipeJson.nutrition_facts[key] -=  vm.IngredientSelected[key]*qty;
                });
            }
                 
        };

        vm.StepsconfirmationModal= function (id){
            if(JsPopupService.confirmationJs())
                vm.StepsList.splice(id, 1);
        };

        vm.SaveRecepi= function(data){
            RecipeService.addRecipe(data).then(function(response) {
                console.log("The Recipe was creating Successfully");
                //vm.success("The Recipe was creating Successfully");
            }, function(err) {
                console.log("There was an error creating the Recipe");
                //vm.error("There was an error creating the Recipe");
            });
            $('.addModal').modal('hide');
        };
    }    
})();
function LoadThumbnail(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#RecepiImg')
                .attr('src', e.target.result)
                .width(200)
                .height(200);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
/*
recipe:
idRestaurant
category

recipe_ingredient:
idUnit

recipe_nutritional

"recipe": [ {
    "idRestaurant": 1,
    "name": "Tostada",
    "url": "https://dietas.ninja/imagenes/como-hacer-la-de-la-sopa-de-tomate.jpg",
    "prepareTime": 20,
    "diners": 2,
    "category": 1,
    "createDate": "2017-09-01 12:18:38"
}],
"recipe_ingredient":[{
    "idIngredient": 2,
    "qty": 3,
    "idUnit": 0
}],
"recipe_nutritional": [ {
    "qty": 1,
    "idUnit": 0
}],
"recipe_procedure": [{
    "step1": [{
        "description": "paso1",
        "orderNo": 1
        }],
    "step2": [{
        "description": "paso2",
        "orderNo": 2
        }]
}],
"nutrition_facts": [{
    "portion": 2.10, 
    "idUnit": 0.00,
    "energeticContent": 1000.00,
    "protein": 10.00,
    "totalFats": 1000.00,
    "saturatedAG": 10.00,
    "monoAG": 10.00,
    "poliAG": 10.00,
    "transAG": 10.00,
    "cholesterol": 10.00,
    "sodium": 10.00,
    "carbohydrates": 10.00,
    "sugarG": 10.00,
    "fiber": 10.00,
    "vitaminA": 10.00,
    "ascorbicAcid": 10.00,
    "folicAcid": 10.00,
    "calcium": 10.00,
    "iron": 10.00,
    "potassium": 10.00,
    "selenium": 10.00,
}]
} 

"recipe_procedure": [
        {
        "description": "paso1",
        "orderNo": 1
        },
        {
        "description": "paso2",
        "orderNo": 2
        }
]
*/