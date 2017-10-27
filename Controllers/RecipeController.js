(function(){
    'use strict';
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
        vm.recipeJson.recipe = {};
        vm.recipeJson.recipe_ingredient = [];
        vm.recipeJson.recipe_procedure = [];
        vm.recipeJson.nutrition_facts = {};
        vm.StepToAdd = "";
        vm.Image = undefined;
        vm.IngredientSelected = {"carbohydrates": 0, "lipids":0, "protein":0, "energyK":0};
        var oldvalue =undefined;
        vm.FileSize = "500";

        CatalogService.getCatalog().then(function(response) {
            vm.Catalog = response.data;
            vm.Catalog.forEach(function(obj) {
                if(vm.CatalogArray[obj.type] === undefined){
                    vm.CatalogArray.push(obj.type);
                    vm.CatalogArray[obj.type]=[]
                    vm.CatalogArray[obj.type].push(obj);  
                }    
                else{
                    vm.CatalogArray[obj.type].push(obj);    
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
            IngredientService.getIngredientNamesByName(name).then(function(response) {
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
            IngredientService.getIngredientByName(data.name).then(function(response) {
                vm.IngredientSelected = response.data[0];  
                vm.IngredientSelected.Unit = {'IdUnit':vm.IdUnitsId,'name': vm.CatalogArray[vm.IdUnitsId][data.idUnit].name};  
            },function (error){
              //vm.error("error geting ingredients");
              console.log(error);
            });            
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
            if(!data.qty)
                data.qty = 1;
            var reqInfo = {'name': data.name,'qty':data.qty,'idUnit':data.idUnit, 'properties': data,'idIngredient':data.id};
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

        vm.StepsconfirmationModal= function (step,index){
            if(JsPopupService.confirmationJs())
                vm.recipeJson.recipe_procedure.splice(index, 1);
        };

        vm.SaveRecepi= function(data){
            data.nutrition_facts.energeticContent =  data.nutrition_facts.energyK;
            data.nutrition_facts.totalFats = data.nutrition_facts.lipids;
            data.nutrition_facts.idUnit = 0;
            data.nutrition_facts.transAG = 0;
            delete data.nutrition_facts['grossWeight'];
            delete data.nutrition_facts['netWeight'];
            delete data.nutrition_facts['energyK'];
            delete data.nutrition_facts['energyJ'];
            delete data.nutrition_facts['lipids'];
            delete data.nutrition_facts['glycemicIndex'];
            delete data.nutrition_facts['glycemicLoad'];
            delete data.nutrition_facts['ethanol'];
            delete data.nutrition_facts['posphorus'];

            data.recipe.category = data.recipe.category.id;
            data.recipe.idRestaurant =data.recipe.idRestaurant.id;
            data.recipe_ingredient.forEach(function(ingredient){
                delete ingredient['properties'];
                delete ingredient['name'];
            });
            data.recipe = data.recipe;
            console.log(data);

            RecipeService.addRecipe(data).then(function(response) {
                console.log("The Recipe was creating Successfully");
                //vm.success("The Recipe was creating Successfully");
            }, function(err) {
                console.log("There was an error creating the Recipe"+ err);
                //vm.error("There was an error creating the Recipe");
            });
            $('.addModal').modal('hide');
        };

        $scope.LoadThumbnail = function (input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
        
                reader.onload = function (e) {
                    $('#RecepiImg')
                        .attr('src', e.target.result)
                        .width(200)
                        .height(200);
                };
                
                reader.onloadend = function() {
                    console.log(vm.recipeJson.recipe.url);
                    console.log('RESULT', reader.result);
                    vm.recipeJson.recipe.url = reader.result;
                  }
                reader.readAsDataURL(input.files[0]);
                
            }
        }
    }    
})();