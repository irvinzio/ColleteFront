(function () {
    app = angular.module('app', ['ngRoute','ngAnimate', 'ui.bootstrap','chart.js']);    
    app.config(['$routeProvider','ChartJsProvider',function($routeProvider,ChartJsProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/AddRecipe.html',
            controller: 'RecipeCtrl as vm',
        })
        .when('/Recipe', {
        templateUrl: 'views/AddRecipe.html',
        controller: 'RecipeCtrl as vm',
        });

        //Configure all charts
        ChartJsProvider.setOptions({
        chartColors: ['#FF5252', '#FF8A80'],
        responsive: false
        });
        // Configure all line charts
        ChartJsProvider.setOptions('line', {
            colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            showLines: false
        });
    }]);    
})();