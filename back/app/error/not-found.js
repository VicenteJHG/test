
'use strict';
const BaseError = require(ERROR_PATH + 'base');

class NotFoundError extends BaseError {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = NotFoundError;