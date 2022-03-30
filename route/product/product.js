var express = require('express');
var router = express.Router();
var categoryModel = require('../../modal/category')
var productModel = require('../../modal/product');

function uniq_product_name(req,res,next){
    var product_name = req.body.product_name;
    var products = productModel.findOne({product_name:product_name})
    products.exec((err,data)=>{
        if(data){
            var product_name1 = data.product_name;
            if(product_name==product_name1){
               return res.send({msg:"Product Name Already Exist"})
            }
        }
        next();
    })
}
function uniq_product_id(req,res,next){
    var product_id = req.body.product_id;
    var products = productModel.findOne({product_id:product_id})
    products.exec((err,data)=>{
        if(data){
            var product_id1 = data.product_id;
            if(product_id==product_id1){
               return res.send({msg:"Product Id Already Exist"})
            }
        }
        next();
    })
}

router.get('/',(req,res)=>{
    var categorys = categoryModel.find({});
    categorys.exec((err,data)=>{
        res.render('./product/addProduct',{title:'index page',data:data})  
    })   
})
router.post('/post',uniq_product_name,uniq_product_id,(req,res)=>{
    var product_name = req.body.product_name;
    var product_id = req.body.product_id;
    var category_name = req.body.category_name;
    var price = req.body.price;
    var description = req.body.description;
    var productData = new productModel({
        product_id:product_id,
        product_name:product_name,
        category_name:category_name,
        price:price,
        description:description,
    })
    productData.save((err,doc)=>{
        if(err) throw err;
        res.send({msg:"Data Insert"})
    })
})

module.exports = router;