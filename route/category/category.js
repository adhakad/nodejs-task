var express = require('express');
var router = express.Router();
var categoryModel = require('../../modal/category')

function uniq_category_name(req,res,next){
    var category_name = req.body.category_name;
    var categorys = categoryModel.findOne({category_name:category_name})
    categorys.exec((err,data)=>{
        if(data){
            var category_name1 = data.category_name;
            if(category_name==category_name1){
               return res.send({msg:"Category Name Already Exist"})
            }
        }
        next();
    })
}
function uniq_category_id(req,res,next){
    var category_id = req.body.category_id;
    var categorys = categoryModel.findOne({category_id:category_id})
    categorys.exec((err,data)=>{
        if(data){
            var category_id1 = data.category_id;
            if(category_id==category_id1){
               return res.send({msg:"Category Id Already Exist"})
            }
        }
        next();
    })
}

router.get('/',(req,res)=>{
    res.render('./category/addCategory',{title:'index page'})     
})
router.post('/post',uniq_category_name,uniq_category_id,(req,res)=>{
    var category_name = req.body.category_name;
    var category_id = req.body.category_id;
    var categoryData = new categoryModel({
        category_name:category_name,
        category_id:category_id,
    })
    categoryData.save((err,doc)=>{
        if(err) throw err;
        res.send({msg:"Data Insert"})
    })
})

module.exports = router;