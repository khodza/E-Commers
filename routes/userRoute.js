const express = require('express');
// IMPORTING CONTROLLERS
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/me', authController.protect, userController.getMe, userController.getUser);
router.delete('/deleteMe', authController.protect, userController.getMe, userController.deleteUser);

// ADDING PROTECT MIDDLEWARE TO ALL ROUTES BELOW
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUser);
router.route('/:id').patch(userController.updateUser);
router.route('/:id').delete(userController.deleteUser);
module.exports = router;
