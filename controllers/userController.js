const User = require('../modules/usersModule');
const handleFactory = require('../handlers/handleFactory');

exports.getAllUsers = handleFactory.getAll(User);
