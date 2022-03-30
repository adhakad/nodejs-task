var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
var categoryModel = require('../../modal/category')
var productModel = require('../../modal/product');

function uniq_product_name(req,res,next){
  var product_name = req.body.product_name;
  var category_name = req.body.category_name;
  var products = productModel.findOne({product_name:product_name,category_name:category_name})
  products.exec((err,data)=>{
      if(data){
          var product_name1 = data.product_name;
          if(product_name==product_name1){
             return res.send({msg:"Product Already Exist"})
          }
      }
      next();
  })
}
router.get('/:id',(req,res)=>{
    var id = req.params.id;
    var products= productModel.findOne({product_id:id})
    products.exec((err,data)=>{
        res.render('./product/updateProduct',{title:'index page',data:data})
   })  
    router.post('/:'+id+'/post',uniq_product_name,(req,res)=>{
        var product_name = req.body.product_name;
        var category_name = req.body.category_name;
        var product_id = req.body.product_id;
        var price = req.body.price;
        var description = req.body.description;
        var pro= productModel.findOne({product_id:id})
        pro.exec((err,data_pro)=>{
          var objid = data_pro._id;
          var pro=productModel.findByIdAndUpdate(objid,{product_id:product_id,product_name:product_name,category_name:category_name,price:price,description:description});
          pro.exec(function(err){
            if(err) throw err;
            res.send({msg:"Product Updated !"})
          })
        })
    }) 
})

module.exports = router;

