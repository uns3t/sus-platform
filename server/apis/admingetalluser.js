const user = require("../db/model/userdb")
const verify = require("../tools/verify")

const admingetusr = async (ctx) => {
    if (!verify.admin_login(ctx)) {
        return
    }
    // TODO 这里userscore属性没了，前端要改
    ctx.body = await user.find()

}

module.exports = admingetusr
