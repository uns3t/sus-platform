const mongoose=require("mongoose")

let logSchema=new mongoose.Schema({
    username:{type:String},
    challengename:{type:String},
    submittime: {type:Date},
    type: {type:String},
    solvedscore: {type:Number,require:true},
    issovled: {type:Boolean},
    flag: {type:String},
})

module.exports=mongoose.model("log",logSchema)
