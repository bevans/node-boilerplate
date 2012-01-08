var mongoose = require('mongoose');

// Add a refernce in model so that there is no
// need to import and init a new mongoose model
// each time we want to access it.  Models can 
// simply be accessed via: model.User
exports.User = require('./user').User;