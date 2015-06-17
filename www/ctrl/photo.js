/**
 * Created by zhaofeng on 2015/6/15.
 */
angular.module('App')
    .controller('photoCtrl', ['$scope', '$cordovaActionSheet', '$cordovaCamera', '$cordovaImagePicker', '$ionicPopup', function ($scope, $cordovaActionSheet, $cordovaCamera, $cordovaImagePicker, $ionicPopup) {
        $scope.images_list = [];
        $scope.addAttachment = function () {


            var actionSheetOptions = {
                title: 'What do you want to choose item?',
                buttonLabels: ['拍照（ng-cordova）,Android测试，返回路径失败', '图库（ng-cordova）','拍照（cordova）'],
                addCancelButtonWithLabel: '取消',
                androidEnableCancelButton : true,
                winphoneEnableCancelButton : true
//                addDestructiveButtonWithLabel : 'Delete it'
            };
            $cordovaActionSheet.show(actionSheetOptions)
                .then(function(btnIndex) {
                    var index = btnIndex;
                    switch (index) {
                        case 1:
                            //使用ng-cordova拍照
                            photo();
                            break;
                        case 2:
                            //使用ng-cordova选择图片
                            pickImage();
                            break;
                        case 3:
                            //使用cordova实现拍照
                            cameraCordova();
                            break;
                        default:
                            break;
                    }
//                    return true;
            });

//            $ionicActionSheet.show({
//                buttons: [
//                    { text: '相机' },
//                    { text: '图库' }
//                ],
//                cancelText: '关闭',
//                cancel: function () {
//                    return true;
//                },
//                buttonClicked: function (index) {
//                    switch (index) {
//                        case 0:
//                            //照相
//                            photo();
//                            break;
//                        case 1:
//                            //选择图片
//                            pickImage();
//                            break;
//                        default:
//                            break;
//                    }
//                    return true;
//                }
//            });
        }
        function photo() {
              //这种样式的有回值
//            var options = {
//                quality: 50,
//                destinationType: Camera.DestinationType.DATA_URL,
//                sourceType: Camera.PictureSourceType.CAMERA,
//                allowEdit: true,
//                encodingType: Camera.EncodingType.JPEG,
//                targetWidth: 400,
//                targetHeight: 400,
//                popoverOptions: CameraPopoverOptions,
//                saveToPhotoAlbum: false
//            };
//
//            $cordovaCamera.getPicture(options).then(function(imageData) {
//                var image = document.getElementById('picture-alubum');
//                image.src = "data:image/jpeg;base64," + imageData;
//            }, function(err) {
//                // error
//            });
            //测试这种样式的没有回值
            var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA
            };

            $cordovaCamera.getPicture(options).then(function (imageURI) {
                $ionicPopup.alert({
                    title: 'title',
                    template: 'picking photo is uri:' + imageURI
                });
                var image = document.getElementById('picture-alubum');
                image.src = imageURI;
            }, function (err) {
                // error
            });


            $cordovaCamera.cleanup().then(); // only for FILE_URI
        }
        function pickImage() {
            var options = {
                maximumImagesCount: 1,
                width: 500,
                height: 800,
                quality: 80
            };

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {

                    $scope.images_list.push(results[0]);
                    $ionicPopup.alert({
                        title: 'title',
                        template: 'picking photo is uri:' + results[0]
                    }).then(function (ref) {
                        if (ref) {
                            var image = document.getElementById('picture-alubum');
                            image.src = results[0];
                        }
                    });

                }, function (error) {
                    // error getting photos
                });
        }

        function cameraCordova(){
//            CustomCamera.getPicture().then(function(imageURI) {
//                //console.log(imageURI);
//                $ionicPopup.alert({
//                    title:'title',
//                    template:'the uri of photo is : '+imageURI
//                });
//            }, function(err) {
//                //console.err(err);
//            }, {
//                quality: 75,
//                targetWidth: 320,
//                targetHeight: 320,
//                saveToPhotoAlbum: false
//            });
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                destinationType: Camera.DestinationType.FILE_URI });

            function onSuccess(imageURI) {
                $ionicPopup.alert({
                    title: 'title',
                    template: 'picking photo is uri:' + imageURI
                });
                var image = document.getElementById('picture-alubum');
                image.src = imageURI;
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
        }

    }])

;