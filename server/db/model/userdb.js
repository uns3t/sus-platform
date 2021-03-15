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
    solved:{type: Array, default: []},       // 解出来的题，总分靠这个查题目分数做加法 //感觉利用数据库的逻辑在于不可继续分割，array类型看起来就很鸡肋
    token:{type: String},      // 独立开docker单独记录flag,flag=md5(flag+token)
    dockerid: {type: String, default: null}    // docker id 每人同时最多开一个
})

module.exports = mongoose.model("user", userSchema)
