const user = require("../db/model/userdb")
const verify = require("../tools/verify")

const admingetusr = async (ctx) => {
    if (!verify.admin_login(ctx)) {
        return
    }
    ctx.body = await user.find()

}

module.exports = admingetusr
