(function(){
    'use strict';
    app.controller('RecipeCtrl',Recipe);

    Recipe.$inject=['$scope', '$rootScope','RecipeService','IngredientService','CatalogService','BussinesService','$timeout','JsPopupService'];

    function Recipe($scope, $rootScope,RecipeService,IngredientService,CatalogService,BussinesService,$timeout,JsPopupService){
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
        vm.fileArray = undefined;
        $scope.labels = ["Lipidos", "Proteinas", "Carbohidratos"];
        $scope.colors = ['#72C02C', '#3498DB', '#717984', '#F1C40F'];
        vm.recipeJson = {};
        vm.recipeJson.nutrition_facts = {};

        vm.initRecipeValues =  function (){
            vm.recipeJson.recipe = {};
            vm.recipeJson.recipe.session = {
                "0": 0,
                "1": 0,
                "2": 0
              };
            vm.recipeJson.recipe.url = null;
            vm.recipeJson.recipe_ingredient = [];
            vm.recipeJson.recipe_procedure = [];
            vm.IngredientSelected = {"carbohydrates": 0, "lipids":0, "protein":0, "energyK":0};
            vm.recipeJson.recipe.idRestaurant = {id:1};
            vm.recipeJson.recipe.category = 104;
            vm.recipeJson.nutrition_facts['lipidsCalories'] = 0;
            vm.recipeJson.nutrition_facts['proteinsCalories'] = 0;
            vm.recipeJson.nutrition_facts['carbohydratesCalories'] = 0;
            vm.getIngredientsProperties();
            vm.alert= {success:false,Error:false,Message:''}
            
            vm.ingredients = [];
            
        };
        vm.getIngredientsProperties = function(){
            IngredientService.getIngredientProperties().then(function(response) {
                vm.recipeJson.nutrition_facts = response; 
            },function (error){
              vm.error(error);
              console.log(error);
            });
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

        BussinesService.GetBussines().then(function(response) {
            vm.Bussines = response;    
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
                vm.IngredientSelected.Unit = {'IdUnit':response.data[0].idUnit,'Name': vm.CatalogArray[vm.UnitsId][response.data[0].idUnit].name,'Qty':response.data[0].portion};
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
            if(!data.Unit.Qty)data.Unit.Qty = 1;
            var reqInfo = {'name': data.name,'qty':data.Unit.Qty,'idUnit':data.Unit.IdUnit, 'properties': data,'idIngredient':data.id};
            vm.recipeJson.recipe_ingredient.push(reqInfo);
            Object.keys(vm.recipeJson.nutrition_facts).forEach(function eachKey(key) {
                if(vm.IngredientSelected[key]<0) return;
                vm.recipeJson.nutrition_facts[key] +=  (vm.IngredientSelected[key]*data.Unit.Qty)/data.portion;
                vm.recipeJson.nutrition_facts[key] =  vm.recipeJson.nutrition_facts[key].round(2);   
            });
            vm.recipeJson.nutrition_facts['lipidsCalories'] = ((vm.recipeJson.nutrition_facts['lipids'])*9).round(2);
            vm.recipeJson.nutrition_facts['proteinsCalories'] = ((vm.recipeJson.nutrition_facts['protein'])*4).round(2);
            vm.recipeJson.nutrition_facts['carbohydratesCalories'] = ((vm.recipeJson.nutrition_facts['carbohydrates'])*4).round(2);

            $scope.data = [
                [vm.recipeJson.nutrition_facts['lipidsCalories'], vm.recipeJson.nutrition_facts['proteinsCalories'], vm.recipeJson.nutrition_facts['carbohydratesCalories']]
            ];
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
                        vm.recipeJson.nutrition_facts[key] =  vm.recipeJson.nutrition_facts[key].round(2);
                });
            }     
        };

        vm.StepsconfirmationModal= function (index){
            if(JsPopupService.confirmationJs())
                vm.recipeJson.recipe_procedure.splice(index, 1);
        };
        vm.SaveRecepi= function(){
            if(vm.recipeJson.recipe.url == null){
                vm.SubmitRecipe(vm.recipeJson);
                return false;
            }
            RecipeService.uploadImage(vm.recipeJson.recipe.url).then(function(response) {
                console.log("The image was uploaded");
                var id = JSON.parse(response.data);
                vm.recipeJson.recipe.url = id.uuid;
                vm.SubmitRecipe(vm.recipeJson);
            }, function(err) {
                console.log("There was an error uploading the image");
                console.log(err);
                vm.error("Hubo un error guardando la imagen de la receta"+ err);
                vm.SubmitRecipe(vm.recipeJson);
            });
        };
        
        vm.SubmitRecipe= function(data){
            if(!(vm.recipeJson.recipe.session[0] || vm.recipeJson.recipe.session[1] || vm.recipeJson.recipe.session[2])){
                vm.error("Se necesita elegir almenos una sesion");
                return false;
            }
            
            var recipeAux = angular.copy(data);
            recipeAux.nutrition_facts.idUnit = 0;
            //recipeAux.nutrition_facts.transAG = 0;
            delete recipeAux.nutrition_facts['grossWeight'];
            delete recipeAux.nutrition_facts['netWeight'];
            delete recipeAux.nutrition_facts['energyJ'];
            delete recipeAux.nutrition_facts['glycemicIndex'];
            delete recipeAux.nutrition_facts['glycemicLoad'];
            delete recipeAux.nutrition_facts['ethanol'];
            delete recipeAux.nutrition_facts['transAG'];

            recipeAux.recipe.idRestaurant = recipeAux.recipe.idRestaurant.id;
            recipeAux.recipe_ingredient.forEach(function(ingredient){
                delete ingredient['properties'];
                delete ingredient['name'];
            });
            
            recipeAux.recipe.session = vm.recipeJson.recipe.session[0] + vm.recipeJson.recipe.session[1] + vm.recipeJson.recipe.session[2];

            recipeAux.recipe_nutritional =  {
                "qty": 1,
                "idUnit": 0
            },
            console.log(recipeAux);

            RecipeService.addRecipe(recipeAux).then(function(response) {
                console.log("The Recipe was creating Successfully");
                vm.success("The Recipe was creating Successfully");
                vm.initRecipeValues();
            }, function(err) {
                console.log("There was an error creating the Recipe");
                console.log(err);
                vm.error("There was an error creating the Recipe"+ err);
            });
            vm.initRecipeValues();
        };
        vm.error = function(msg){
            vm.alert.Error = true;
            vm.alert.Message = msg;
            $('.ErrorMessage').show();
        };
        vm.success = function(msg){
            vm.alert.success = true;
            vm.alert.Message = msg;
            $('.SuccessMessage').show();
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
                reader.readAsDataURL(input.files[0]);
                $scope.imageFile = input.files[0];
            }
        };        
    }    
})();