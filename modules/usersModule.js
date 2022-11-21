const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide valid email'],
    unique: true,
    lowercase: true,
    validate: validator.isEmail,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlenght: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    // Works only on .crate and .save
    validate: {
      validator(el) {
        return el === this.password;
      },
      message: 'Passwords are not same',
    },
    passwordChangedAt: Date,
  },
});

usersSchema.pre('save', async function (next) {
  // console.log('hio');
  console.log(!this.isModified('password'));
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, process.env.BCRYPT_SALT * 1);
  this.passwordConfirm = undefined;
  next();
});

usersSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
usersSchema.methods.changedPasswordAfter = function (JWTtimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000);

    return JWTtimestamp < changedTimestamp;
  }
  return false;
};
const User = mongoose.model('User', usersSchema);
module.exports = User;
