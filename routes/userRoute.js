const express = require('express');
// IMPORTING CONTROLLERS
const ratelimit =require('express-rate-limit')
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const loginLimiter = ratelimit({
    max: 5,
    windowMs: 30 * 60 * 1000,
    // message: 'Too many requests from this IP. Please try again after 30 min ',
    handler: (request, response, next, options) =>
		response.status(429).json({
            status:'failed',
            message:'Too many requests from this IP. Please try again after 30 min',
        }),
  });

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login',loginLimiter, authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);
router.get('/me', authController.protect, userController.getMe, userController.getUser);
router.delete('/deleteme', authController.protect, userController.getMe, userController.deleteUser);
router.patch('/updateme', authController.protect, userController.updateMe, userController.updateUser);
router.patch('/updatemypassword', authController.protect, authController.updateMyPassword);
// ADDING PROTECT MIDDLEWARE TO ALL ROUTES BELOW
router.use(authController.protect);

// Admin routes
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUser);
router.route('/:id').patch(userController.updateUser);
router.route('/:id').delete(userController.deleteUser);
module.exports = router;
