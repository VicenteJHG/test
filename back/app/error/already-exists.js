

'use strict';
const BaseError = require(ERROR_PATH + 'base');

class AlreadyExistsError extends BaseError {
    constructor(message) {
        super(message, 409);
    }
}

module.exports = AlreadyExistsError;