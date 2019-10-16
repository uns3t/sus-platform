const mongoose=require("mongoose")

let challengeSchema=new mongoose.Schema({
    challengename:{type:String},
    flag:{type:String},
    score: {type:Number},
    solved: {type:Number,default:0},
    submit: {type:Number,default:0},
    type: {type:String},
})

module.exports=mongoose.model("challenge",challengeSchema)
