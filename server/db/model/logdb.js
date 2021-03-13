const mongoose=require("mongoose")

let logSchema=new mongoose.Schema({
    username:{type:String},
    challengename:{type:String},
    submittime: {type:String},
    type: {type:String},
    // solvedscore: {type:Number,require:true},     // 没什么用，弃了
    issolved: {type:Boolean},
    flag: {type:String},
})

module.exports=mongoose.model("log",logSchema)
