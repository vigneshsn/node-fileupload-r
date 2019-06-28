var formidable = require('formidable');
var fs = require('fs');
var q = require("q");
var fileHandler = require("../filehandler");
var _ = require('lodash');
var appError = require('../apperror');
var errorMap = appError.getErrorMap();

/**
 * [uploadAndValidate - This method parses the request into files and validate the files]
 * @param  {[request]} req [ request contains the files]
 * @param  {[response]} res [http response]
 * @return {[response]}     [returns response after validating of files]
 */
exports.uploadAndValidate = function(req, res) {

    // create an incoming form object
    var formObject = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    formObject.multiples = true;

    formObject.parse(req, function(err, fields, fileObj) {
        var resObj = [],
            promises = [];

        if (err) {
            res.json({
                errCode: 'ERROR_COMMON',
                errDesc: errorMap['ERROR_COMMON']
            });
        }

        _.each(fileObj, function(file) {
            promises.push(fileHandler.processFile(req, res, file).then(function(result) {
                resObj.push(result);
            }));
        });

        q.all(promises).then(function() {
            res.json(resObj);
        }).catch(function() {
            res.json({
                errCode: 'ERROR_COMMON',
                errDesc: errorMap['ERROR_COMMON']
            });
        });

    });
};
