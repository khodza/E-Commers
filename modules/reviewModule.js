const mongoose =require('mongoose')
// const Product =require('./productModule')

const reviewSchema = new mongoose.Schema({
    content:{
        type:String,
        required:[true,'Review must contain content!']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'Review must belong to user']
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:[true,'Review must belong to product']
    },
    rating:{
        type:Number,
        max:5,
        min:1,
        required:[true,'Review must have rating']
    }
})


const Review = mongoose.model('Reviews',reviewSchema);
module.exports =Review;