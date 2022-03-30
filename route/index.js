var express = require('express');
var router = express.Router();
var productModel = require('../modal/product')

router.get('/',(req,res)=>{
    var product = productModel.find({});
    product.exec((err,data)=>{
        if(data==null){
            res.render('index',{title:'index page',data:"",alerts:"Data not available",index:""})
        }else{
            index = 1;
            res.render('index',{title:'index page',data:data,alerts:"",index:index})
        }
    })
})

router.delete('/delete', function(req, res,) {
    var id=req.body.id;
    var products=productModel.findOne({product_id:id,});
    products.exec(function(err,data){
      if(err) throw err;
      var ObjectiId=data._id;
      var productStatus=productModel.findByIdAndDelete(ObjectiId);
      productStatus.exec(function(err){
        if(err) throw err;
        res.send({msg:'success'}); 
      });  
    });
  });

module.exports = router;