const express = require('express');
// IMPORTING CONTROLLERS
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
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
