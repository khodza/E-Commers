const catchAsync = require('../utils/catchAsync');

exports.getAll = (Model) => catchAsync(async (req, res, next) => {
  const doc = await Model.find();

  res.status(200).json({
    status: 'succes',
    result: doc.length,
    data: {
      data: doc,
    },
  });
});
