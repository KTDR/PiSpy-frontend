var express = require('express');
var router = express.Router();

// Require controller modules.
var dashboard_controller = require('../controllers/dashboardController');
var config_controller = require('../controllers/configController');
var users_controller = require('../controllers/usersController');
var testing_controller = require('../controllers/testingController');

/// DASHBOARD ROUTES ///

// GET dashboard home page.
router.get('/', dashboard_controller.index);

//Temp fix for an issue with the 404 page
router.get('/index', dashboard_controller.index);

// GET request to open the configuration page
router.get('/config', config_controller.display_config);

// GET request to open the user table
router.get('/table', users_controller.display_users);

// GET request for deleting all users
router.get('/table/deleteall', users_controller.delete_all_users_get);

// GET request for adding a new user 
router.get('/register', users_controller.new_user_get);

// POST request for adding a new user
router.post('/register', users_controller.new_user_post);

// GET request for deleting user 
router.get('/delete_user', users_controller.delete_user_get);

// POST request for deleting user
router.post('/delete_user', users_controller.delete_user_post);


// GET request to open the testing page
router.get('/testing', testing_controller.index);


module.exports = router;