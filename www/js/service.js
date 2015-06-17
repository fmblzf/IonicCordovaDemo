/**
 * Created by zhaofeng on 2015/6/16.
 */
angular.factory('CustomCamera',['$q',function($q){
    return {
        getPicture:function(options){
            var q = $q.defer();
            navigator.camera.getPicture(function(result){
                q.resolve(result);
            },function(err){
                q.reject(err);
            },options);
            return q.promise;
        }
    };
}]);

//angular.module('MyService')
//    .factory('MyAlert', ['$ionicPopup', function ($ionicPopup) {
//        return {
//            show: function (title, content) {
//                $ionicPopup.alert({
//                    title: title,
//                    template: content
//                });
//            }
//        };
//    }]);