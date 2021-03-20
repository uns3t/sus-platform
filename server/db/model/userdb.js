const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false)   //推荐开启
let userSchema = new mongoose.Schema({
    username: {type: String},
    pwd: {type: String},
    studentid: {type: String},
    ecard: {type: String},
    phone: {type: String},
    name: {type: String},
    qq: {type: String},
    email: {type: String},
    time: {type: String},       // 最近一次解题时间
    verification: {type: String, default: null},    // 验证码
    expiration: {type: Number, default: 0},          // 验证码有效时间
    solved:{type: Array, default: []},       // TODO 有改进空间?解出来的题，总分靠这个查题目分数做加法
    token:{type: String},      // 独立开docker单独记录flag,flag=md5(flag+token)
    dockerTimeout: {type: Number, default: null},    // docker由定时任务启动，存一个id，为null时表示用户未启动docker
    port: {type: Number},        // 用户docker对应的端口
    timestamp: {type: Number},   // docker创建时间戳
    challengename: {type: String}   // docker对应的题目名称
})

module.exports = mongoose.model("user", userSchema)
