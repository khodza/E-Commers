const mongoose = require('mongoose');
const arrayValidator = require('mongoose-array-validator');
const slugify = require('slugify');
const User = require('./usersModule');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please add product name'],
    maxlength: [40, 'The Product must have less or equal 40 characters'],
    minlength: [5, 'The Product must have more or equal 5 characters'],
  },
  slug: {
    type: String,
  },
  gender: [{ type: String, required: [true, 'Add gendor type'] }],
  brand: {
    type: String,
    required: [true, 'Add brand name'],
  },
  category: {
    type: String,
    required: [true, 'Add category'],
  },
  season: [{ type: String, required: [true, 'Add season'] }],
  coverImg: {
    type: String,
    required: [true, 'Add covering image'],
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: User,
    required: [true, 'Add seller'],

  },

  images: {
    type: [String],
    required: [true, 'Add images of product'],
    minItems: {
      value: 2,
      message: (props) => `length of \`${props.path}\` (${props.value.length}) is less than allowed!`,
    },
    maxItems: {
      value: 4,
      message: (props) => `length of \`${props.path}\` (${props.value.length}) is more than allowed!`,
    },
    uniqueItems: {
      value: true,
      message: (props) => 'No duplicates allowed in images!',
    },

  },

  inStock: {
    type: Boolean,
  },
  // rating: {
  //   type: Number,
  //   min: [1, 'Rating must be above 1.0'],
  //   max: [5, 'Rating must be below 5.0'],
  // },

  ratingAvg: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  style: [{ type: String, required: [true, 'Add style'] }],
  price: {
    type: Number,
    required: [true, 'Add price to product'],
  },

  discountPrice: {
    type: Number,
    validate: {
      validator(val) {
        return val < this.price;
      },
      message: 'Discount price must be less then price of product',
    },
  },
  quantity: {
    type: Number,
    required: [true, 'Add quantity of products'],
  },
  sizes: [{ type: Number, required: [true, 'Add some sizes '] }],

  color: [{ type: String, required: [true, 'Add colors'] }],
  description: {
    type: String,
    required: [true, 'Add description to your product'],
  },
  createdAt: {
    type: Date,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

productSchema.index({ slug: 1 });
productSchema.virtual('discountPercent').get(function () {
  return Math.round((100 - (this.discountPrice * 100) / this.price) * 10) / 10;
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  console.log(this.slug);
  next();
});
productSchema.plugin(arrayValidator);
const Product = mongoose.model('Products', productSchema);

module.exports = Product;
