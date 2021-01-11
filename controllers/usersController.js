const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
//var userDB = require('../storage/userDB.json');
const fs = require('fs');



exports.display_users = function(req, res) {
    console.log('requested user table');
    var userDB = require('../storage/userDB.json');
    //console.log(userDB);
    
    res.render('table', { user_list: userDB });
    
};

exports.new_user_get = function(req, res) {   
    res.render('register');
};

exports.new_user_post = function(req, res) {   
    var userDB = require('../storage/userDB.json');
    //Validation and sanitation needs to be added in final product, bad actors could possibly force bad data past HTML side validation
    const source = req.body;
    var newUser = {
        name: source.first_name + ' ' + source.last_name,
        }
    
    userDB[userDB.length] = newUser;
    fs.writeFileSync('./storage/userDB.json', JSON.stringify(userDB, null, 4), error => console.log(error));    //This shouldn't be synchronous, a DB solution is preferable
    res.render('table', { user_list: userDB });
};

exports.delete_user_get = function(req, res) {
    res.render('delete_user');
}
exports.delete_user_post = function(req, res) {
    const source = req.body;
    fs.writeFileSync('./storage/userToDelete.txt', source.first_name + ' ' + source.last_name, error => console.log(error));    
    var userDB = require('../storage/userDB.json');
    
    res.render('table', { user_list: userDB });


}

exports.delete_all_users_get = function(req, res) {

    res.render('table', { user_list: userDB });
}

