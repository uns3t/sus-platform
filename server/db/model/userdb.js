const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    username: {type: String},
    pwd: {type: String},
    // userscore: {type: Number, default: 0},
    studentid: {type: String},
    ecard: {type: String},
    phone: {type: String},
    name: {type: String},
    qq: {type: String},
    email: {type: String},
    time: {type: String},       // 最近一次解题时间
    verification: {type: String, default: null},    // 验证码
    expiration: {type: Number, default: 0},          // 验证码有效时间
    solved:{type: Array, default: []},       // 解出来的题，总分靠这个查题目分数做加法
    token:{type: String},      // 独立开docker单独记录flag,flag=md5(flag+token)
    dockerTimeout: {type: Number, default: null}    // docker由定时任务启动，存一个id
})

module.exports = mongoose.model("user", userSchema)
