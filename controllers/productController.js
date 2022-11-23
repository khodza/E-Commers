const Product = require('../modules/productModule');
const handleFactory = require('../handlers/handleFactory');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

exports.addProduct = handleFactory.createOne(Product);
exports.getAllProducts = handleFactory.getAll(Product);
