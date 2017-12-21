const router = require('express').Router();
const StaticDataController = require(CONTROLLER_PATH + 'staticData');

let staticData = new StaticDataController();

// Create time
router.get('/champions', staticData.champions);

 

module.exports = router;
