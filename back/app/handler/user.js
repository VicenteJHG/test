const UserModel = require(MODEL_PATH + 'user').UserModel;
const NotFoundError = require(ERROR_PATH + 'not-found');
const AlreadyExistsError = require(ERROR_PATH + 'already-exists');
const ValidationError = require(ERROR_PATH + 'validation');
const UnauthorizedError = require(ERROR_PATH + 'unauthorized');

class UserHandler {
    constructor() {
        this._validator = require('validator');
    }

    static get USER_VALIDATION_SCHEME() {
        return {
            'firstName': {
                notEmpty: true,
                isLength: {
                    options: [{min: 2, max: 20}],
                    errorMessage: 'First getName must be between 2 and 15 chars long'
                },
                errorMessage: 'Invalid First Name'
            },
            'lastName': {
                notEmpty: true,
                isLength: {
                    options: [{min: 2, max: 20}],
                    errorMessage: 'Lastname must be between 2 and 15 chars long'
                },
                errorMessage: 'Invalid First Name'
            },
            'email': {
                isEmail: { errorMessage: 'Invalid Email' },
                errorMessage: "Invalid email provided"
            },

            'password': {
                notEmpty: true,
                isLength: {
                    options: [{min: 5, max: 35}],
                    errorMessage: 'Password must be between 6 and 35 chars long'
                },
                errorMessage: 'Invalid Password Format'
            }
        };
    }

    getUserInfo(req, userToken, callback) {
        req.checkParams('id', 'Invalid user id provided').isMongoId();
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There have been validation errors: ' + errorMessages.join(' && '));
                }
                 
                let userId = req.params.id;
                return new Promise(function (resolve, reject) {
                    UserModel.findById(userId, function (err, user) {
                        if (err !== null) {
                            reject(err);
                        } 

                        if ( !user ) {
                            reject(new NotFoundError("User not found"));
                        } else {
                            resolve(user);
                        }
                        
                    });
                });
            })
            .then((user) => { callback.onSuccess(user); })
            .catch((error) => { callback.onError(error); });
    }

    getAllUsers(req, userToken, callback) { 
        req.getValidationResult()
            .then((result) => {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There have been validation errors: ' + errorMessages.join(' && '));
                }

                return new Promise(function (resolve, reject) {
                    UserModel.findById(userToken.id, function (err, user) {
                        if (err !== null) {
                            reject(err);
                        } 

                        if ( !user ) {
                            reject(new NotFoundError("User not found"));
                        } else {
                            resolve(user);
                        }                           
                    });
                })
            })
            .then((user)=>{
                return new Promise(function (resolve, reject) {
                    UserModel.find({ 'role': { $in: ['Normal','Manager'], $ne:user.role } }, function (err, user) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            resolve(user);                            
                        }
                    }).sort( { role: -1 } );
                });

            }) 
            .then((user) => { callback.onSuccess(user); })
            .catch((error) => { callback.onError(error); });
    }

    updateUser(req, callback) {
        let data = req.body;
        let validator = this._validator;

        req.body.password = "*******";
        req.checkBody(UserHandler.USER_VALIDATION_SCHEME);

        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    console.log(result);
    

                   throw new ValidationError('Duplicated user');
                    
                }
                return new Promise(function (resolve, reject) {
                    UserModel.findOne({_id: req.params.id}, function (err, user) {
                        if (err !== null) {
                            reject(err);
                        } else {
                            if (!user) {
                                reject(new NotFoundError("User not found"));
                            }
                            else {
                                resolve(user);
                            }
                        }
                    })
                });
            }
        )
        .then((user) => {
            user.firstName = validator.trim(data.firstName);
            user.lastName = validator.trim(data.lastName);
            user.email = validator.trim(data.email);
            user.save();
            return user;
        })
        .then((saved) => { callback.onSuccess(saved); })
        .catch((error) => { callback.onError(error); });
    }

    deleteUser(req, callback) {
        let data = req.body;
        req.checkParams('id', 'Invalid user id provided').isMongoId();
        req.getValidationResult()
            .then(function (result) {
                    if (!result.isEmpty()) {
                        let errorMessages = result.array().map(function (elem) {
                            return elem.msg;
                        });
                        throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                    }
                    return new Promise(function (resolve, reject) {
                        UserModel.findOne({_id: req.params.id}, function (err, time) {
                            if (err !== null) {
                                reject(err);
                            } else {
                                if (!time) {
                                    reject(new NotFoundError("Time not found"));
                                }
                                else {
                                    resolve(time);
                                }
                            }
                        })
                    });
                }
            )
            .then((time) => {
                time.remove();
                return time;
            })
            .then((saved) => { callback.onSuccess(saved); })
            .catch((error) => {  callback.onError(error); });
    }

    createNewUser(req, callback) {
        let data = req.body;
        let validator = this._validator;
        
        req.checkBody(UserHandler.USER_VALIDATION_SCHEME);
        req.getValidationResult()
            .then(function (result) {
                if (!result.isEmpty()) {
                    let errorMessages = result.array().map(function (elem) {
                        return elem.msg;
                    });
                    throw new ValidationError('There are validation errors: ' + errorMessages.join(' && '));
                }
                return new UserModel({
                    firstName: validator.trim(data.firstName),
                    lastName: validator.trim(data.lastName),
                    email: validator.trim(data.email),
                    password: validator.trim(data.password)
                });
            })
            .then((user) => {
                return new Promise(function (resolve, reject) {
                    UserModel.find({email: user.email}, function (err, docs) {
                        if (docs.length) {
                            reject(new AlreadyExistsError("User already exists"));
                        } else {
                            resolve(user);
                        }
                    });
                });
            })
            .then((user) => {
                user.save();
                return user;
            })
            .then((saved) => { callback.onSuccess(saved); })
            .catch((error) => { callback.onError(error); });
    }
}

module.exports = UserHandler;