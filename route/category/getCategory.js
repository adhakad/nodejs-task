var express = require('express');
var router = express.Router();
var categoryModel = require('../../modal/category')

router.get('/',(req,res)=>{
    var category = categoryModel.find({});
    category.exec((err,data)=>{
        if(data==null){
            res.render('./category/getCategory',{title:'index page',data:"",alerts:"Data not available",index:""})
        }else{
            index = 1;
            res.render('./category/getCategory',{title:'index page',data:data,alerts:"",index:index})
        }
    })
})

router.delete('/delete', function(req, res,) {
    var id=req.body.id;
    var cats = categoryModel.findOne({category_id:id,});
    cats.exec(function(err,data){
      if(err) throw err;
      var ObjectiId=data._id;
      var category=categoryModel.findByIdAndDelete(ObjectiId);
      category.exec(function(err){
        if(err) throw err;
        res.send({msg:'success'}); 
      });  
    });
  });


module.exports = router;