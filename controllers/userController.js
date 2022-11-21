const User = require('../modules/usersModule');
const handleFactory = require('../handlers/handleFactory');

exports.getAllUsers = handleFactory.getAll(User);
exports.getUser = handleFactory.getOne(User);
exports.updateUser = handleFactory.updateOne(User);
exports.deleteUser = handleFactory.deleteOne(User);
