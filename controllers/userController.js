const User = require('../modules/usersModule');
const handleFactory = require('../handlers/handleFactory');
const AppError = require('../utils/appError');

exports.getAllUsers = handleFactory.getAll(User);
exports.getUser = handleFactory.getOne(User);
exports.updateUser = handleFactory.updateOne(User);
exports.deleteUser = handleFactory.deleteOne(User);
exports.getMe = async (res, req, next) => {
  req.params.id = req.user.id;
  next();
};
