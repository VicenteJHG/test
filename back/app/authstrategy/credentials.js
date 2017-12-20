
const LocalAuthStrategy = require('passport-local').Strategy;
const UserModel = require(MODEL_PATH + 'user').UserModel;
const UnauthorizedError = require(ERROR_PATH + 'unauthorized');
const NotFoundError = require(ERROR_PATH + 'not-found');

class CredentialsAuthStrategy extends LocalAuthStrategy {
    constructor() {
        super(CredentialsAuthStrategy.provideOptions(), CredentialsAuthStrategy.handleUserAuth);
    }

    get name() {
        return 'credentials-auth';
    }

    static handleUserAuth(username, password, done) {
        UserModel.findOne({email: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(new NotFoundError("User not found"), false);
            }
            if (!user.checkPassword(password)) {
                return done(new UnauthorizedError("Invalid credentials"), false);
            }
            return done(null, user);
        });
    }

    static provideOptions() {
        return {
            usernameField: 'email',
            passReqToCallback: false,
            passwordField: 'password',
            session: false
        };
    }

    getSecretKey() {
        throw new Error("No key is required for this type of auth");
    }
}
exports = module.exports = CredentialsAuthStrategy;