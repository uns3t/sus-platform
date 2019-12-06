const mongoose=require("mongoose")

let srcSchema=new mongoose.Schema({
    type:{type:String},
    description:{type:String},
    time:{type:String}
})

module.exports=mongoose.model("src",srcSchema)

