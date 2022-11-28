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
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    toJSON:{virtuals:true, toObject:{virtuals:true}}
})
reviewSchema.index({product:1,user:1},{unique:true})


reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:'name photo'
    })
    next()
})

const Review = mongoose.model('Reviews',reviewSchema);
module.exports =Review;