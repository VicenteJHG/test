const BaseController = require(CONTROLLER_PATH + 'base');
const ResponseManager = require(MANAGER_PATH + 'response');
const BaseAutoBindedClass = require(BASE_PACKAGE_PATH + 'base-autobind');

class StaticDataController extends BaseController {
    constructor() {
        super();
      
    }






    champions(req, res, next) {
     
        let reqParams = req.params.userId || req.body.userId || req.params.id || req.body.id ;  
        let responseManager = this._responseManager;
        
        this.performRequest('/lol/static-data/v3/champions', 'GET', {
          'locale':'en_US','tags':'all','dataById':'false'
 
  
  }, function(data) {
  console.log(data);
  });
           // responseManager.respondWithError( res,401, "User is not authorized");

            //responseManager.getDefaultResponseHandler(res)
    }
}
module.exports = StaticDataController;