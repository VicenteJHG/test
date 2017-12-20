const BaseController = require(CONTROLLER_PATH + 'base');
const AuthHandler = require(HANDLER_PATH + 'auth');

class AuthController extends BaseController {
    constructor() {
        super();
        this._authHandler = new AuthHandler();
        this._passport = require('passport');
    } 

    // Request token by credentials
    create(req, res, next) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, next, (user) => {
            let response =  {
                onSuccess: function( jwtToken ) {
                    let userToken = { 'userId':user.id,'token': jwtToken.token};
                    responseManager.getDefaultResponseHandler(res).onSuccess(userToken);
                },
                onError: function( error ) {
                    responseManager.respondWithError(res, error.status || 401, error.message);
                }
            }
            this._authHandler.issueNewToken(req, user, response);
        });
    }

    // Revoke Token
    remove(req, res, next) {
        let responseManager = this._responseManager;
        let authHandler = this._authHandler;
        
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: function (token, user) {
                authHandler.revokeToken(req, token, responseManager.getDefaultResponseHandler(res));
            },
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res, next);

    }

    authenticate(req, res, next, callback) {
        let responseManager = this._responseManager;     
        this._passport.authenticate('credentials-auth', function (err, user) {        
            if (err) {
                responseManager.respondWithError(res, err.status || 401, err.message || "");
            } else {
                callback(user);
            }
        })(req, res, next);
    }

}

module.exports = AuthController;