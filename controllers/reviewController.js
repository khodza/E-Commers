const handleFactory = require('../handlers/handleFactory')
const Review =require('../modules/reviewModule')

exports.addReview =handleFactory.createOne(Review)
exports.updateReview =handleFactory.updateOne(Review)
exports.deleteReview = handleFactory.deleteOne(Review)
exports.getReview =handleFactory.getOne(Review)
exports.getAllReviews =handleFactory.getAll(Review) 