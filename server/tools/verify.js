function verify_admin(ctx) {
    if (ctx.state.tokencode !== 1) { // not admin
        ctx.body = {
            msg: "401"
        }

        return false
    }
    if (ctx.state.userinfo.expires < Date.now()) {
        ctx.body = {
            msg: "登陆Token过期，请重新登陆"
        }
        return false
    }
    return true
}

function verify_user(ctx) {
    if (ctx.state.tokencode === -1) { // not login
        ctx.body = {
            msg: "401"
        }

        return false
    }
    if (ctx.state.userinfo.expires < Date.now()) {
        ctx.body = {
            msg: "登陆Token过期，请重新登陆"
        }
        return false
    }
    return true
}

module.exports = {
    admin_login: verify_admin,
    user_login: verify_user
};