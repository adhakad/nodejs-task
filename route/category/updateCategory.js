var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
var categoryModel = require('../../modal/category')
var productModel = require('../../modal/product');

function uniq_category_name(req,res,next){
  var category_name = req.body.category_name;
  var category = categoryModel.findOne({category_name:category_name})
  category.exec((err,data)=>{
      if(data){
          var category_name1 = data.category_name;
          if(category_name==category_name1){
             return res.send({msg:"Category Already Exist"})
          }
      }
      next();
  })
}
router.get('/:id',(req,res)=>{
    var id = req.params.id;
    var category= categoryModel.findOne({category_id:id})
    category.exec((err,data)=>{
        res.render('./category/updateCategory',{title:'index page',data:data})
   })  
    router.post('/:'+id+'/post',uniq_category_name,(req,res)=>{
        var category_name = req.body.category_name;
        var category_id = req.body.category_id;
        var pro= categoryModel.findOne({category_id:id})
        pro.exec((err,data_pro)=>{
          var objid = data_pro._id;
          var cats = categoryModel.findByIdAndUpdate(objid,{category_id:id,category_name:category_name});
          cats.exec(function(err){
            if(err) throw err;
            res.send({msg:"Category Updated !"})
          })
        })
    }) 
})

module.exports = router;

