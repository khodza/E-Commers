const express = require('express');
// IMPORTING CONTROLLERS
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

// ADDING PROTECT MIDDLEWARE TO ALL ROUTES BELOW
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUser);
module.exports = router;
