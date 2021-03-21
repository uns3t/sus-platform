const challenge = require("../db/model/challengedb")
const verify = require("../tools/verify")
const format = require("../tools/format")
const user = require("../db/model/userdb")

const reqformat = {
    challengename: String,
}

const queryDocker = async (ctx) => {
    if (!verify.user_login(ctx)) {
        return
    }
    let body = ctx.request.body

    if (!format(reqformat, body)) {
        ctx.body = {
            msg: "数据验证不通过"
        }
        return
    }

    let tempuser = await user.findOne({username: ctx.state.userinfo.username})
    let tempcha = await challenge.findOne({challengename: body.challengename})
    if (tempcha.hasDocker) {
        if (tempuser.dockerTimeout !== null) {      // 开了容器，前端比较哪个题吧
            ctx.body = {
                challengename: tempuser.challengename,
                port: tempuser.port,
                timestamp: tempuser.timestamp,
                hasDocker: true
            }
        } else {     // 没开容器
            ctx.body = {
                challengename: null,
                port: null,
                timestamp: null,
                hasDocker: true
            }
        }
    } else {     // 该题不存在docker
        ctx.body = {hasDocker: false}
    }
}

module.exports = queryDocker