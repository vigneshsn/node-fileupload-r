var _ = require('lodash');

var FILE_TYPE_XML = "text/xml";
var FILE_TYPE_CSV = "application/vnd.ms-excel";

/**
 * [formatFileContent Formates the file based on the file type]
 * @param  {[type]} records [The record to be formatted]
 * @param  {[type]} type    [file type]
 * @return {[obj]}         [Returns formatted obj]
 */
exports.formatFileContent = function(records, type) {
    if (type === FILE_TYPE_XML) {
        return formatXmlRecords(records, type);
    } else if (type === FILE_TYPE_CSV) {
        return formatCsvRecords(records, type)
    } else {
        return records;
    }
}

function formatXmlRecords(records, type) {
    var formatted = [];
    _.each(records, function(record) {
        formatted.push({
            "refenceNumber": record['$']['reference'],
            "accountNumber": record["accountNumber"][0],
            "description": record["description"][0],
            "startBalance": record["startBalance"][0],
            "mutation": record["mutation"][0],
            "endBalance": record["endBalance"][0]
        });
    });
    return formatted;
};

function formatCsvRecords(records, type) {
    var formatted = [];
    _.each(records, function(record) {
        formatted.push({
            "refenceNumber": record['Reference'],
            "accountNumber": record["Account Number"],
            "description": record["Description"],
            "startBalance": record["Start Balance"],
            "mutation": record["Mutation"],
            "endBalance": record["End Balance"]
        });
    });
    return formatted;
}
