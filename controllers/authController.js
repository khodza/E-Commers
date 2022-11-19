const jwt = require('jsonwebtoken');
const util = require('util');
const User = require('../modules/usersModule');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  user.password = undefined;
  res.status(statusCode).json({
    status: 'succes',
    token,
    cookieOptions,
    data: {
      user,
    },
  });
};
exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1)  Checking Email and Password
  if (!email || !password) {
    return next(new AppError('Provide email and password'));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || (!await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid password or email', 401));
  }
  createSendToken(user, 200, res);
});

exports.protect = async function (req, res, next) {
  // 1) Cheking token and if its there!
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookie.jwt) {
    token = req.cookie.jwt;
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }
  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exist!', 401));
  }

  // 4) Check if user changed password after token was issued

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again', 401));
  }
  req.user = currentUser;
  next();
};
