/**
 * [upload module]
 */
(function() {
    'use strict';
    angular.module('myApp.upload', ['ngFileUpload']).
    config(['uploadConstant', function(uploadConstant) {
        uploadConstant.uploadUrl = window._envConfig.uploadUrl;
        uploadConstant.baseUrl = window._envConfig.baseUrl;
    }]);
})();
