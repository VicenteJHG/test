const BaseController = require(CONTROLLER_PATH + 'base');
const TimeHandler = require(HANDLER_PATH + 'time');
const NotFoundError = require(ERROR_PATH + 'not-found');

class TimeController extends BaseController {
    constructor() {
        super();
        this._timeHandler = new TimeHandler();
    }

    getAll(req, res, next) {  
        this.authenticate(req, res, next, (token, user) => {
            this._timeHandler.getAll(req, this._responseManager.getDefaultResponseHandler(res));
        },'Admin,Itself' );
    }
    
    getWeeklyReport(req, res, next) {
           this.authenticate(req, res, next, (token, user) => {
            this._timeHandler.getWeeklyReport(req, this._responseManager.getDefaultResponseHandler(res));
        });
    }

    create(req, res, next) {
        this.authenticate(req, res, next,(token, user) => {
            this._timeHandler.createNewTime(req, this._responseManager.getDefaultResponseHandler(res));
        }, 'Admin,Itself' );
    }

    update(req, res, next) {
        this.authenticate(req, res, next, (token, user) => {
            this._timeHandler.updateTime(req, this._responseManager.getDefaultResponseHandler(res));
        }, 'Admin,Itself' );
    }

    remove(req, res, next) {        
        this.authenticate(req, res, next, (token, user) => {
            this._timeHandler.deleteTime(req, this._responseManager.getDefaultResponseHandler(res));
        } );
    }
}

module.exports = TimeController;