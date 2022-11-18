const User = require('../modules/usersModule');
const handleFactory = require('./handleFactory');

exports.getAllUsers = handleFactory.getAll(User);
