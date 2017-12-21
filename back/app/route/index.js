const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.js'));
router.use('/users', require('./user.js'));
router.use('/times', require('./time.js'));
router.use('/lol/static-data/v3', require('./static-data.js'));







module.exports = router; 