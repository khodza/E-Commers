const User = require('../modules/usersModule');
const handleFactory = require('../handlers/handleFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = handleFactory.getAll(User);
exports.getUser = handleFactory.getOne(User);
exports.updateUser = handleFactory.updateOne(User);
exports.deleteUser = handleFactory.deleteOne(User);
exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});
