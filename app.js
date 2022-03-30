const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'views'))

var index = require('./route/index')
var category = require('./route/category/category')
var getCategory = require('./route/category/getCategory')
var updateCategory = require('./route/category/updateCategory')

var product = require('./route/product/product')
var updateProduct = require('./route/product/updateProduct')
var singleProduct = require('./route/product/singleProduct')

app.use('/',index)
app.use('/category',category)
app.use('/getCategory',getCategory)
app.use('/updateCategory',updateCategory)

app.use('/product',product)
app.use('/updateProduct',updateProduct)
app.use('/singleProduct',singleProduct)


app.listen(5000)