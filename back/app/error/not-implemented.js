

'use strict';
const BaseError = require(ERROR_PATH + 'base');

class NotImplemented extends BaseError {
    constructor(message) {
        super(message, 501);
    }
}

module.exports = NotImplemented;