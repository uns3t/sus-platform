var express = require('express');
var usrdb=require('../todb/usrdb')

function postlogin(req, res) {
    console.log(req.body)
    usrdb.find({usrname:req.body.usrname},function (err,temp) {
        console.log(temp)
        if (temp[0].pwd==req.body.pwd){
            var ret={
                success:true
            }
            res.send(ret)
            console.log(res)
        }
    })
}

module.exports = postlogin;
