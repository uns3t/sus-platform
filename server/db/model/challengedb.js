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
    isDynamic: {type:Boolean, default: false},  // 是否动态flag
    hasDocker: {type:Boolean, default: false},// 是否是独立docker
    imageName: {type: String},       // 镜像名
    port:{type: Number}     // 暴露的端口
})

module.exports=mongoose.model("challenge",challengeSchema)
