const ResponseManager = require(MANAGER_PATH + 'response');
const BaseAutoBindedClass = require(BASE_PACKAGE_PATH + 'base-autobind');

class BaseController extends BaseAutoBindedClass {
    constructor() {
        super();
        if (new.target === BaseController) {
            throw new TypeError("Cannot construct BaseController instances directly");
        }

        this._responseManager = ResponseManager;
        this._passport = require('passport')
    }

    authenticate(req, res, next, callback, allowed ) {
        let reqParams = req.params.userId || req.body.userId || req.params.id || req.body.id ;  
        let responseManager = this._responseManager;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: function( token, user ) {
                if ( typeof(allowed) !== "undefined" ) {
                    let arr_allowed = allowed.split(',');
                    if (( arr_allowed.indexOf( user.role ) > -1 ) ||
                        ( arr_allowed.indexOf( 'Itself' ) > -1 && user.id == reqParams )) {           
                        callback( token, user );
                    } else { 
                        responseManager.respondWithError( res,401, "User is not authorized");
                    }
                } else {
                    callback(token, user);
                }
            },

            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res, next);
    }
}
module.exports = BaseController;