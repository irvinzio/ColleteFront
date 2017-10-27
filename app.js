(function () {
    app = angular.module('app', ['ngRoute','ngAnimate', 'ui.bootstrap']);    
    app.config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/AddRecipe.html',
            controller: 'RecipeCtrl as vm',
        })
        .when('/Recipe', {
        templateUrl: 'views/AddRecipe.html',
        controller: 'RecipeCtrl as vm',
        });
    });
    // app.
    // config(function(envServiceProvider) {
    //     // set the domains and variables for each environment 
    //     envServiceProvider.config({
    //         domains: {
    //             development: ['http://localhost:3000'],
    //             production: ['http://vivediabetes.ddns.net:3000'],
    //             test: ['http://localhost:3000']
    //         },
    //         vars: {
    //             development: {
    //                 apiUrl: 'http://localhost:8080',
    //                 staticUrl: '//static.acme.dev.local'
    //             },
    //             test: {
    //                 apiUrl: 'http://localhost:8080',
    //                 staticUrl: '//static.acme.dev.test'
    //             },
    //             production: {
    //                 apiUrl: 'http://vivediabetes.ddns.net:8080',
    //                 staticUrl: '//static.acme.com'
    //             },
    //             defaults: {
    //                 apiUrl: 'http://localhost:8080',
    //                 staticUrl: '//static.default.com'
    //             }
    //         }
    //     });
 
    //     // run the environment check, so the comprobation is made 
    //     // before controllers and services are built 
    //     envServiceProvider.check();
    // });
    
})();