const mongoose=require("mongoose")

let pySchema = new mongoose.Schema({
    pyer: {type:String},    // py者
    pyee: {type:String},    // 被py的flag提供者
    pychaname: {type: String},
    pyflag: {type: String}
})

module.exports=mongoose.model("py",pySchema)
