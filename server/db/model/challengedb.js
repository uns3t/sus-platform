const mongoose=require("mongoose")

let challengeSchema=new mongoose.Schema({
    challengename:{type:String},
    flag:{type:String},  // 独立开docker则flag存在用户位置
    description:{type:String},
    score: {type:Number},       // current score
    originscore:{type:Number},  // hold origin score
    solved: {type:Number,default:0},
    submit: {type:Number,default:0},
    type: {type:String},
    isDynamic: {type:Boolean, default: false}   // 是否是独立docker的动态flag
})

module.exports=mongoose.model("challenge",challengeSchema)
