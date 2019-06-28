(function($app) {
    'use strict';

    $app.service('uploadService', UploadService);
    UploadService.$inject = ['uploadConstant', 'Upload'];

    function UploadService(uploadConstant, Upload) {
        /**
         * [upload description]
         * @param  {[file]} files [file to be uploaded]
         * @return {[promise]}       [returns a promise]
         */
        this.upload = function(files) {
            var urlString = uploadConstant.baseUrl + uploadConstant.uploadUrl;
            return Upload.upload({
                url: urlString,
                data: {
                    files: files
                }
            });
        };
    }

})(angular.module('myApp.upload'));
