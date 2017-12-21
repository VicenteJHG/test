const ResponseManager = require(MANAGER_PATH + 'response');
const BaseAutoBindedClass = require(BASE_PACKAGE_PATH + 'base-autobind');

const axios = require('axios');


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




 performRequest(endpoint, method, data, success) {
    axios.defaults.headers.common['X-Riot-Token'] = "RGAPI-65dba0bc-69c4-4bea-b88a-31b41681fef3";
    console.log("inside here");
    axios.get('https://euw1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=true')
        .then((response)=>{ console.log(response)})
        .catch((err) => console.log(err));


}



}
module.exports = BaseController;