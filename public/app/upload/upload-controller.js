(function($app) {
    'use strict';

    $app.controller('uploadController', UploadController);
    UploadController.$inject = ['$scope', 'uploadService', 'uploadFactory', 'uploadConstant'];

    function UploadController($scope, uploadService, uploadFactory, uploadConstant) {

        /**
         * [vm holds the this reference]
         * @type {[type]}
         */
        var vm = this;

        /**
         * [result - Holds formatted data that comes from server]
         * @type {Object}
         */
        vm.result = undefined;

        /**
         * [showDefaultMsg variable to show/hide default message]
         * @type {Boolean}
         */
        vm.showDefaultMsg = true;

        /**
         * [uploadFiles - upload the files to server]
         * @param  {[file]} files [files to upload]
         */
        vm.uploadFiles = function(files) {

            if (files && files.length > 0) {
                uploadService.upload(files).then(function onSuccess(resp) {
                    vm.showDefaultMsg = false;
                    vm.result = uploadFactory.formatRespData(resp);
                }, function onFailure(err) {
                    //error
                }, function onEvent(evt) {
                    vm.progress = uploadFactory.getUploadProgress(evt);
                });
            }

        };
    }

})(angular.module('myApp.upload'));
