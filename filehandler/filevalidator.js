var _ = require('lodash');
var fileFormatter = require('./fileformatter');
var appError = require('../apperror');
var errorMap = appError.getErrorMap();

var DUP_REFNO = "DUPLICATE_REFNO";
var INVALID_ENDBAL = "END_BALANCE_INVALID";

/**
 * [validateFileContent Apply the validation logic]
 * @param  {[array]} records [The records for validation]
 * @param  {[string]} type    [The type of file format]
 * @return {[obj]}         [error object]
 */
exports.validateFileContent = function(records, type) {
    var errorList = [],
        refNumberCount;

    records = fileFormatter.formatFileContent(records, type);

    //group records based on refenceNumber
    refNumberCount = _.countBy(records, 'refenceNumber');

    _.each(records, function(record) {
        var validationErrors = [];
        var endBalance = _.round(record['endBalance'], 2);
        var startBal = _.round(record['startBalance'], 2);
        var mutation = _.round(record['mutation'], 2);
        var refNo = record['refenceNumber'];
        var refDesc = record['description'];

        // #validation 1 - check for duplicates refNo
        if (refNumberCount[refNo] > 1) {
            validationErrors.push(DUP_REFNO)
        }

        //  #validation 2 - check the endbalance
        if (_.round((startBal + mutation), 2) !== endBalance) {
            validationErrors.push(INVALID_ENDBAL)
        }

        //add to main error list
        if (validationErrors.length > 0) {
            errorList.push({
                refNo: refNo,
                desc: refDesc,
                validationErrors: validationErrors
            });
        }

    });

    return errorList;
}
