const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.js'));
router.use('/users', require('./user.js'));
router.use('/times', require('./time.js'));

module.exports = router; 