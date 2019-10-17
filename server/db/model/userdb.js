const mongoose=require("mongoose")

let userSchema=new mongoose.Schema({
    username:{type:String},
    pwd:{type:String},
    userscore: {type:Number,default:0},
    studentid:{type:String},
    phone:{type:String},
    name:{type:String},
    qq:{type:String},
    email:{type:String}
})

module.exports=mongoose.model("user",userSchema)
