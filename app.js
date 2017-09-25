(function () {
    app = angular.module('app', ['ngRoute','ngAnimate', 'ui.bootstrap']);
    app.value('BaseUrl', 'http://localhost:3000');
    
     /*
    .config(config);

    config.$inject = ['$routeProvider','$locationProvider'];
   
    function config($routeProvider,$locationProvider) {
        $locationProvider.html5Mode(false);
        console.log('entro a routes');
        $routeProvider
            .when('/funcionarios/:id', {
                templateUrl: 'templates/funcionarios/show.html',
                controller: 'funcionariosInfoCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    } 
    */
    
})();