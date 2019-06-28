(function($app) {
    'use strict';

    $app.factory('uploadFactory', UploadFactory);
    UploadFactory.$inject = ['uploadConstant'];

    function UploadFactory(uploadConstant) {

        return {
            getUploadProgress: uploadProgress,
            formatRespData: formatRespData
        };

        /**
         * [uploadProgress description]
         * @param  {[type]} evt [description]
         * @return {[type]}     [returns the progress for loading bar]
         */
        function uploadProgress(evt) {
            return Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        };

        function addErrors(resp, item) {
            angular.forEach(item.errorList, function(error) {

                if (error.validationErrors.indexOf(uploadConstant.invalidBalance) !== -1) {
                    resp.balanceMismatch.push({
                        refNo: error.refNo,
                        desc: error.desc
                    });
                }

                if (error.validationErrors.indexOf(uploadConstant.duplicateRef) !== -1) {
                    resp.duplicateRecord.push({
                        refNo: error.refNo,
                        desc: error.desc
                    });
                }

            });
        }

        /**
         * [formatRespData This method formats the resp for view to render]
         * @param  {[object]} resp [the response data from server]
         * @return {[object]}      [returns formatted data]
         */
        function formatRespData(resp) {
            var formattedResp = {
                balanceMismatch: [],
                duplicateRecord: []
            };

            if (resp && resp.data) {
                angular.forEach(resp.data, function(item) {
                    addErrors(formattedResp, item);
                });
            }

            return formattedResp;
        }
    }

})(angular.module('myApp.upload'));
