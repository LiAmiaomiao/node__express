/**
 * Created by Li_Ruli on 2018/11/14.
 */
var app=require('./app')
var express=require('express')
var router=express.Router()
var fs=require('fs')
var Student=require('./student')


router.get('/students',function(req,res){
    Student.find(function(err,students){
        if(err){
            return res.status(500).send('Server error')
        }
        res.render('index.html',{
            fruits:['JavaScript','Java','Php'],
            students:students
        })
    })
})
router.get('/students/new',function(req,res){
   res.render('new.html')
})
router.post('/students/new',function(req,res){
   Student.save(req.body,function(err){
      if(err){
          return res.status(500).send('Server error')
      }
      res.redirect('/students')
    })
})
router.get('/students/edit',function(req,res){
   Student.findById(parseInt(req.query.id),function(err,student){
      if(err){
          return res.status(500).send('Server error')
      }
      res.render('edit.html',{
          student:student
      })
   })
})
router.post('/students/edit',function(req,res){
    Student.update(req.body,function(err){
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})
router.get('/students/delete',function(req,res){
  Student.deleteById(req.query.id,function(err){
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})
module.exports=router
