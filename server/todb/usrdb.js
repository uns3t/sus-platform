const mongoose=require("mongoose")

mongoose.connect('mongodb://localhost:27017/susctf');

var Schema = mongoose.Schema

//新建约束
var usrSchema = new Schema({
        usrname:{
            type:String,
            require:true
        },
        pwd:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        studentid:{
            type:String,
        },
        qq:{
            type:String,
        },
        phone:{
            type:String,
        },
        name:{
            type:String,
        },
    },
    {
        collection:"usrdb"
    })
//导出模板构造函数
module.exports = mongoose.model('usrdb',usrSchema);

