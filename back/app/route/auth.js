const router = require('express').Router();
const AuthController = require(CONTROLLER_PATH + 'auth');
let authController = new AuthController();

router.post('/', authController.create);
router.delete('/:token',  authController.remove);

module.exports = router;