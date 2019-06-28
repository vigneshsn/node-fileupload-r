/**
 * [baseUrl Holds the constant]
 * @type {String}
 */
(function($app) {
    'use strict';

    $app.constant('uploadConstant', {
        baseUrl: '',
        uploadUrl: '',
        invalidBalance: 'END_BALANCE_INVALID',
        duplicateRef: 'DUPLICATE_REFNO'
    });

})(angular.module('myApp.upload'));
