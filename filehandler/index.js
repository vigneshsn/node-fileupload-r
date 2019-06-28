var csvtojson = require("csvtojson");
var xml2js = require('xml2js');
var q = require("q");
var fs = require('fs');
var _ = require('lodash');
var fileValidator = require('./filevalidator');
var appError = require('../apperror');
var errorMap = appError.getErrorMap();
var FILE_TYPE_XML = "text/xml";
var FILE_TYPE_CSV = "application/vnd.ms-excel";
var SYSTEM_ERR = "-1";

/**
 * [processFile This method process the file and converts file data to json]
 * @param  {[type]} req  [request]
 * @param  {[type]} res  [response]
 * @param  {[file]} file [The file to be processed]
 * @return {[promise]} file [returns an promise]
 */
exports.processFile = function(req, res, file) {

    if (file.type === FILE_TYPE_XML) {
        return processXmlFile(req, res, file);
    } else if (file.type === FILE_TYPE_CSV) {
        return processCsvFile(req, res, file);
    } else {
        //gracefully handle errors invalid file
        return q.when({
            id: file.name,
            hasError: true,
            errorList: [{
                refNo: SYSTEM_ERR,
                validationErrors: [errorMap['INVALID_FILE_TYPE']]
            }]
        });
    }
}

/**
 * [processCsvFile This method process the csv file and converts file data to json]
 * @param  {[type]} req  [request]
 * @param  {[type]} res  [response]
 * @param  {[file]} file [The file to be processed]
 * @return {[promise]} file [returns an promise]
 */
function processCsvFile(req, res, file) {
    var deferred = q.defer();
    var Converter = csvtojson.Converter;
    var converter = new Converter();

    converter.fromFile(file.path, function(err, result) {
        if (result && result.length > 0) {
            var errorList = fileValidator.validateFileContent(result, FILE_TYPE_CSV);
            var hasError = false;
            if (errorList && errorList.length > 0) {
                hasError = true;
            }
            deferred.resolve({
                id: file.name,
                hasError: hasError,
                errorList: errorList
            });
        } else {
            //gracefully handle the error and pass an error code.
            deferred.resolve({
                id: file.name,
                hasError: true,
                errorList: [{
                    refNo: SYSTEM_ERR,
                    validationErrors: [errorMap['FILE_CURRUPTED']]
                }]
            });
        }
    });

    return deferred.promise;
}

/**
 * [processCsvFile This method process the xml file and converts file data to json]
 * @param  {[type]} req  [request]
 * @param  {[type]} res  [response]
 * @param  {[file]} file [The file to be processed]
 * @return {[promise]} file [returns an promise]
 */
function processXmlFile(req, res, file) {
    var parser = new xml2js.Parser();
    var deferred = q.defer();
    fs.readFile(file.path, function(err, data) {
        parser.parseString(data, function(err, result) {

            if (result && result["records"]) {

                var errorList = fileValidator.validateFileContent(result["records"]["record"], FILE_TYPE_XML);
                var hasError = false;
                if (errorList && errorList.length > 0) {
                    hasError = true;
                }

                deferred.resolve({
                    id: file.name,
                    hasError: hasError,
                    errorList: errorList
                });

            } else {
                //gracefully handle the error and pass an error code.
                deferred.resolve({
                    id: file.name,
                    hasError: true,
                    errorList: [{
                        refNo: SYSTEM_ERR,
                        validationErrors: [errorMap['FILE_CURRUPTED']]
                    }]
                });
            }

        });
    });
    return deferred.promise;
}
