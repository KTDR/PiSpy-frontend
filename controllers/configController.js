const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display the configuration page
exports.display_config = function(req, res) {
    res.render('config');
};


