
'use strict';
const BaseError = require(ERROR_PATH + 'base');

class ForbiddenError extends BaseError {
    constructor(message) {
        super(message, 403);
    }
}

module.exports = ForbiddenError;