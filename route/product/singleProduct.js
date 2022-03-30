var express = require('express');
var router = express.Router();
var categoryModel = require('../../modal/category')
var productModel = require('../../modal/product');

router.get('/:id',(req,res)=>{
    var product_id = req.params.id;
    var pro = productModel.findOne({product_id:product_id});
    pro.exec((err,data)=>{   
      res.render('./product/singleProduct',{title:'index page',data:data})
    })
  })

  module.exports = router;