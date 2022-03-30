const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/tasking',{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false})
var conn = mongoose.Collection
var categorySchema = new mongoose.Schema({
    category_id:{
        type:Number,
    },
    category_name:{
        type:String,
    },
})

var categoryModel = mongoose.model('category',categorySchema)
module.exports = categoryModel;
