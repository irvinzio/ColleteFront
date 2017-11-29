(function(){
    'use strict';
    app.controller('RecipeCtrl',Recipe);

    Recipe.$inject=['$scope', '$rootScope','RecipeService','IngredientService','CatalogService','BussinesService','$timeout','JsPopupService','CategoryService'];

    function Recipe($scope, $rootScope,RecipeService,IngredientService,CatalogService,BussinesService,$timeout,JsPopupService,CategoryService){
        var vm = this;
        vm.UnitsId = 13;
        vm.CategoryId = 15;
        vm.Ingredients = new Array();
        vm.Bussines = undefined;
        vm.Catalog = undefined;
        vm.CatalogArray = [];
        vm.IngredientSelected = undefined;
        vm.StepToAdd = "";
        vm.Image = undefined;
        vm.FileSize = "500";
        var oldvalue =undefined;

        vm.initRecipeValues =  function (){
            vm.recipeJson = {};
            vm.recipeJson.recipe = {};
            vm.recipeJson.recipe.url = "fake path";
            vm.recipeJson.recipe_ingredient = [];
            vm.recipeJson.recipe_procedure = [];
            vm.recipeJson.nutrition_facts = {};
            vm.IngredientSelected = {"carbohydrates": 0, "lipids":0, "protein":0, "energyK":0};
            vm.recipeJson.recipe.idRestaurant = {id:1};
        };

        vm.initRecipeValues();


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
            vm.Category = vm.CatalogArray[vm.CategoryId];
            console.log(vm.Category);
        },function (error){
          vm.error(error);
          console.log(error);
        });
        // //temp get for category
        // CategoryService.GetCategories().then(function(response) {
        //     vm.Category = response;   
        // },function (error){
        //   vm.error(error);
        //   console.log(error);
        // });

        BussinesService.GetBussines().then(function(response) {
            vm.Bussines = response;    
        },function (error){
          vm.error(error);
          console.log(error);
        });

        IngredientService.getIngredientProperties().then(function(response) {
            vm.recipeJson.nutrition_facts = response; 
        },function (error){
          vm.error(error);
          console.log(error);
        });

        IngredientService.getIngredientPorpertiesDisplayName().then(function(response) {
            vm.IngredientDisplayName = response;  
        },function (error){
          vm.error(error);
          console.log(error);
        });

        vm.GetIngredientByName = function(name){ 
            IngredientService.getIngredientNamesByName(name).then(function(response) {
                vm.Ingredients = [];
                response.data.forEach(function(data) {
                    vm.Ingredients.push(data);
                  });      
            },function (error){
              vm.error(error);
              console.log(error);
            });
        };

        vm.UpdateInfo = function (data){
            IngredientService.getIngredientById(data.id).then(function(response) {
                vm.IngredientSelected = response.data[0];  
                vm.IngredientSelected.Unit = {'IdUnit':response.data[0].idUnit,'Name': vm.CatalogArray[vm.UnitsId][response.data[0].idUnit].name};
            },function (error){
              vm.error(error);
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
            console.log(data);
            if(!data.qty)data.qty = 1;
            var reqInfo = {'name': data.name,'qty':data.qty,'idUnit':data.Unit.IdUnit, 'properties': data,'idIngredient':data.id};
            vm.recipeJson.recipe_ingredient.push(reqInfo);
            Object.keys(vm.recipeJson.nutrition_facts)
            .forEach(function eachKey(key) {
                if(vm.IngredientSelected[key]>0)      
                    vm.recipeJson.nutrition_facts[key] +=  vm.IngredientSelected[key]*data.qty;
            });
            console.log(vm.recipeJson.recipe_ingredient);
            vm.IngredientSelected = [];
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
            data.recipe.idRestaurant = data.recipe.idRestaurant.id;
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
        vm.error = function(error){
            vm.ErrorMessage = error;
            $('#ErrorMessage').show();
        };
        vm.success = function(success){
            vm.SuccessMessage = success;
            $('#SuccessMessage').show();
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
                    vm.recipeJson.recipe.url = reader.result;
                  }
                reader.readAsDataURL(input.files[0]);
                vm.uploadFile(input.files);
            }
        }

        vm.uploadFile = function(fileList) {
            var url = 'http://vivediabetes.ddns.net:3000/Recipe/uploadImage';
            var config = { headers: { 'Content-Type': undefined },
                           transformResponse: angular.identity
                         };
            var promises = fileList.map(function(file) {
                return $http.post(url, file, config);
            });
            return $q.all(promises);
        };
    }    
})();