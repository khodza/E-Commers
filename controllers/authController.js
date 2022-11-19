const jwt = require('jsonwebtoken');
const util = require('util');
const User = require('../modules/usersModule');
const catchAsync = require('../utils/catchAsync');

const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  console.log(cookieOptions);
  res.cookie('jwt', token, cookieOptions);

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
  console.log(email, password);
  // 1)  Checking Email and Password
  if (!email || !password) {
  //  Error
  // Provide email and password
    console.log('Provide email and password');
  }
  const user = await User.findOne({ email }).select('+password');
  console.log(user);
  // if (!user || !await user.correctPassword(password, user.password)) {
  //   // Error
  //   // Invalid password or email
  // }
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
    // Error
    // 'You are not logged in'
  }
  const decoded = util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {

    // Error
    // The user belonging to this token no longer exist!
  }

  // 4) Check if user changed password after token was issued
  req.user = currentUser;
  next();
};
