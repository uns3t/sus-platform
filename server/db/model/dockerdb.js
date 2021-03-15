const mongoose = require("mongoose")

let dockerSchema = new mongoose.Schema({
    challengeid: {type: String},            //对应的challenge
    userid: {type: String},                 //对应的username
    Timeout: {type: Number, default: null}    // 定时任务
})

module.exports = mongoose.model("docker", dockerSchema)
