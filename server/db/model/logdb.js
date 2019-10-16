const mongoose=require("mongoose")

let logSchema=new mongoose.Schema({
    username:{type:String},
    challengename:{type:String},
    solvedtime: {type:Date},
    type: {type:String},
    solvedscore: {type:Number,require:true}
})

module.exports=mongoose.model("log",logSchema)
