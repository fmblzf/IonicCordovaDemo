angular.module('App', ['ionic','ngCordova'])
        //,'ngCordova'
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(['$compileProvider',function($compileProvider){
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file| tel):/);
    }])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise("/photo");
        $stateProvider.state('photo',{
            url:'/photo',
            templateUrl:'templates/photo.html',
            controller:'photoCtrl'
        })
    }])
;
