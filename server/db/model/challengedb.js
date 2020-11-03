const mongoose=require("mongoose")

let challengeSchema=new mongoose.Schema({
    challengename:{type:String},
    flag:{type:String},
    description:{type:String},
    score: {type:Number},       // current score
    originscore:{type:Number},  // hold origin score
    solved: {type:Number,default:0},
    submit: {type:Number,default:0},
    type: {type:String}
})

module.exports=mongoose.model("challenge",challengeSchema)
