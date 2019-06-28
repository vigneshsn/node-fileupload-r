/**
 * [getErrorMap The error code and desc are maintained here]
 * @return {[type]} [returns the error mapper object]
 */
exports.getErrorMap = function() {
    return {
        "DUPLICATE_REFNO": "Duplicate record found for this Reference number",
        "END_BALANCE_INVALID": "Mismatch found in End balance",
        "INVALID_FILE_TYPE": "This file type is not supported. Only csv and xml file are supported.",
        "FILE_CURRUPTED": "Seems the file is corrupted",
        "ERROR_COMMON": "Technical issue has occured"
    };
};
