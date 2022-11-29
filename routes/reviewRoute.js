const express =require('express');

const reviewController =require('../controllers/reviewController')
const authController =require('../controllers/authController')

const router =express.Router();


router.route('/').get(authController.protect,authController.restrictTo('admin'),reviewController.getAllReviews).post(authController.protect,authController.restrictTo('user'),reviewController.addReview)

router.route('/:id').get(reviewController.getReview).patch(authController.protect,authController.restrictTo('user'),reviewController.updateReview).delete(authController.protect,authController.restrictTo('admin','user'),reviewController.deleteReview)

module.exports =router;
