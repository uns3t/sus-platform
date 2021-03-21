const verify = require("../tools/verify")
const user = require("../db/model/userdb")

const getDockers = async (ctx) => {
    if (!verify.admin_login(ctx)) {
        return
    }
    let dockerUser = await user.find({dockerTimeout: {$ne: null}}) // 查询非空
    let ret = []
    for(let user of dockerUser)
    {
        ret.push({username: user.username, dockerID: user.token, challengename: user.challengename})
    }

    ctx.body = ret
}

module.exports = getDockers