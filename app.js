/**
 * Created by Li_Ruli on 2018/11/14.
 */
var express=require('express')
var router=require('./router')
var bodyParser=require('body-parser')
var app=express()
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))
app.engine('html',require('express-art-template'))
//配置模板引擎和body-parser一定要在app.use(router)挂载路由之前
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(router)
app.listen(3000,function(){
    console.log('running')
})
module.exports=app