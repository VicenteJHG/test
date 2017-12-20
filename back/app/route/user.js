const router = require('express').Router();
const UserController = require(CONTROLLER_PATH + 'user');
let userController = new UserController();

// Get single user
router.get('/:id',  userController.get);

// Get all users, 
router.get('/', userController.getAll);

// Create user
router.post('/',  userController.create);

// Modify user 
router.put('/:id',  userController.update);

// Delete user
router.delete('/:id',   userController.remove )

module.exports = router;