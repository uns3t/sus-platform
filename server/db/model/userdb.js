const mongoose=require("mongoose")

let userSchema=new mongoose.Schema({
    username:{type:String},
    pwd:{type:String},
    userscore: {type:Number,default:0},
    studentid:{type:String},
    ecard:{type:String},
    phone:{type:String},
    name:{type:String},
    qq:{type:String},
    email:{type:String},
    time:{type:String},
    verification:{type:String, default:null},
    expiration:{type:Number,default:0},
    lucky_draw:{type:Number,default: 1}
})

module.exports=mongoose.model("user",userSchema)
