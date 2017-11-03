/*(function(){
    'use strict';
    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
        .when('/usuarios', {
          templateUrl: '/templates/usuarios/list.html',
          controller: 'usuariosCtrl as vm',
        })
      }]);
    
    app.controller('usuariosCtrl',usuarios);

    usuarios.$inject=['$scope', '$rootScope', 'UserService','$timeout','JsPopup'];

    function usuarios($scope, $rootScope,UsuariosService,CargosService,$timeout,JsPopup){
        var vm = this;
        vm.addTitle="Agregar Usuario";
        vm.editTitle="Editar Usuario";
        vm.formPath="templates/usuarios/form.html";
        vm.deleteTitle="Desea eliminar el usuario?";
        vm.formData = {};
        vm.usuarios = [];
        vm.roles = [{'id':'d','value':'Elige un rol'},{'id':'a','value':'administrador'},{'id':'c','value':'capturista'}];
        vm.formData.rol={'id':'d','value':'Elige un rol'};
        var rolArray={};rolArray['c']='Capturista';rolArray['a']='Administrador';

        vm.getRol= function(rolId){
             return rolArray[rolId];
        };
        UsuariosService.getUsuarios().then(function(response) {
            vm.usuarios = response;
            console.log(response);
            
        });
        CargosService.getCargos().then(function(response) {
            vm.cargos = response;
            
        });
        
        vm.delete= function(id){
            UsuariosService.removeUsuario(id).then(function(response) {
                UsuariosService.getUsuarios().then(function(response) {
                    vm.usuarios = response;
                });
            }, function(err) {
                //$('.errorMsg').modal('show');
                alert("Hubo un error al realizar la transaccion");
            });
        }
        vm.updateData= function (data){
            vm.fillData(data);
            $('.editModal').modal('show');
        };
        vm.confirmationModal= function (data){
            vm.fillData(data);
            (JsPopup.confirmationJs())?vm.delete(vm.formData.id):vm.clearForm();

        };
         vm.fillData = function(data){
            vm.formData.id=data.id;
            vm.formData.nombres=data.nombres;
            vm.formData.apellido_materno=data.apellido_materno;
            vm.formData.apellido_paterno=data.apellido_paterno;
            vm.formData.cargo_id=data.cargo_id;
        };
        vm.edit= function(){
            vm.formData.cargo_id=vm.formData.cargo_id.id;
            UsuariosService.updateUsuario(vm.formData).then(function(response) {
                UsuariosService.getUsuarios().then(function(response) {
                    vm.usuarios = response;
                    
                });
                vm.formData={};
            }, function(err) {
                //$('.errorMsg').modal('show');
                alert("Hubo un error al realizar la transaccion");
            });
            $('.editModal').modal('hide');
        }
        vm.create= function(){
            UsuariosService.addUsuario(vm.formData).then(function(response) {
                UsuariosService.getUsuarios().then(function(response) {
                    vm.usuarios = response;
                });
                vm.clearForm();
            }, function(err) {
                //$('.errorMsg').modal('show');
                alert("Hubo un error al realizar la transaccion");
            });
            $('.addModal').modal('hide');
        }
        vm.clearForm= function(){
            vm.formData={};
        };
         vm.error= function(msg){
            vm.errorMsg=msg;
            vm.err=true; 
            $timeout(function(){ vm.err=!vm.err; }, 3000);
        };
         vm.success= function(msg){
            vm.successMsg=msg;
             vm.ok=true; 
             $timeout(function(){ 
                vm.ok=!vm.ok; }, 3000);
        };
            
        $scope.predicate = 'nombre';
        $scope.reverse = true;
        vm.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
    }    
})();

*/