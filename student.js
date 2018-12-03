/**
 * Created by Li_Ruli on 2018/11/14.
 */
/*
* student.js不关心业务逻辑，只处理数据
* */
var fs=require('fs')
var dbPath='./db.json'
//获取所有学生列表
//return []
exports.find=function(callback){
    fs.readFile(dbPath,'utf8',function(err,data) {
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
}

//添加学生
exports.save=function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data) {
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        student.id=students[students.length-1].id+1
        students.push(student)
        var fileData=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

//更新学生
exports.update=function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data) {
        if(err){
            return callback(err)
        }
        student.id=parseInt(student.id)
        var students=JSON.parse(data).students
        student.id = parseInt(student.id)
        //定义对象stu，利用id找到是具体是哪一行数据

        var stu = students.find(function (item) {
            return item.id===student.id
        })
        // //把新传入的数据覆盖原本stu取到的值，得到最新的数据
        for(var key in student){
            stu[key]=student[key]
        }

        var fileData=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}

exports.findById=function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data) {
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        var ret=students.find(function(item){
            return item.id===parseInt(id)
        })
        callback(null,ret)
    })
}
//删除学生
exports.deleteById=function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data) {
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        var deleteId=students.findIndex(function(item){
            return item.id===parseInt(id)
        })
        students.splice(deleteId,1)
        var fileData=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}
