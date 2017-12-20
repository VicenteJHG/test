
'use strict';
const BaseError = require(ERROR_PATH + 'base');

class UnauthorizedError extends BaseError {
    constructor(message) {
        super(message, 401);
    }
}

module.exports = UnauthorizedError;