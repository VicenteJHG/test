

'use strict';
const BaseError = require(ERROR_PATH + 'base');

class ValidationError extends BaseError {
    constructor(message) {
        super(message, 400);
    }
}

module.exports = ValidationError;