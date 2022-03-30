
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/tasking',{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false})
var conn = mongoose.Collection
var productSchema = new mongoose.Schema({
    product_id:{
        type:Number,
    },
    product_name:{
        type:String,
    },
    category_name:{
        type:String,
    },
    price:{
        type:String,
    },
    description:{
        type:String,
    },
})

var productModel = mongoose.model('product',productSchema)
module.exports = productModel;
