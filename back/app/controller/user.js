const BaseController = require(CONTROLLER_PATH + 'base');
const UserHandler = require(HANDLER_PATH + 'user');

class UserController extends BaseController {
    constructor() {
        super();
        this._userHandler = new UserHandler();
    }

    get(req, res, next) {  
        this.authenticate(req, res, next, (token, user) => {
            this._userHandler.getUserInfo(req, user, this._responseManager.getDefaultResponseHandler(res));
       },'Admin,Manager,Itself');    
    } 

    remove(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._userHandler.deleteUser(req, this._responseManager.getDefaultResponseHandler(res));
        },'Admin,Manager');
    }

    create(req, res) {
        this._userHandler.createNewUser(req, this._responseManager.getDefaultResponseHandler(res));
    }

    getAll(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._userHandler.getAllUsers(req, user, this._responseManager.getDefaultResponseHandler(res));
        },'Admin,Manager');
    }

    update(req, res, next) {   
        this.authenticate(req, res, next, (token, user) => {
            this._userHandler.updateUser(req, this._responseManager.getDefaultResponseHandler(res));     
        },'Admin,Manager');    
    }   
}

module.exports = UserController;