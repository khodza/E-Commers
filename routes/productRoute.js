const express = require('express');

const authController = require('../controllers/authController');
const productController = require('../controllers/productController');

const router = express.Router();

router.route('/').get(productController.getAllProducts).post(authController.protect, authController.restrictTo('admin','seller'), productController.addProduct);

router.route('/:id').get(productController.getProduct).patch(authController.protect, authController.restrictTo('admin','seller'), productController.updateProduct).delete(authController.protect, authController.restrictTo('admin','seller'), productController.deleteProduct);
module.exports = router;
