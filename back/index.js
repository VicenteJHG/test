
// Root path
global.ROOT_PATH = __dirname + '/app/';
// Set other app paths
require('./config/global-paths');


// Set config variables
global.config = require('./config');

// Create an Express App
const express = require('express');
const app = express();


// Include dependencies
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require(ROUTE_PATH);
const ValidationManager = require(MANAGER_PATH + 'validation');
const authManager = require(MANAGER_PATH + 'auth');
const validationManager = new ValidationManager();


// Connect to DB
mongoose.Promise = global.Promise;
mongoose.connect(config.db.MONGO_CONNECT_URL,{
	useMongoClient: true
});




// Use json formatter middleware
app.use(bodyParser.json());
app.use(authManager.providePassport().initialize());


// Set Up validation middleware
app.use(validationManager.provideDefaultValidator());

// Add headers
app.use(function (req, res, next) {

// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', '*');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
 
// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
next();
});
// Setup routes
app.use('/', routes);

app.listen(global.config.server.PORT, function () {
    console.log('App is running on ' + global.config.server.PORT);
});