const user=require("../db/model/userdb")
const format=require("../tools/format")
const md5 = require('md5-node')
const reqformat={
    newpass:String,
    confirmpass:String,
    email:String,
    verification:String
}


const passchange=async(ctx)=> {
    let body = ctx.request.body
    if (!format(reqformat, body)) {
        ctx.body = {
            msg: "数据验证未通过"
        }
        return
    }
    for (let v of body) {
        if (body[v] == "") {
            ctx.body = {
                msg: "您的输入数据不能为空"
            }
            return
        }
    }
    if (body.newpass != body.confirmpass) {
        ctx.body = {msg: "两次密码不相同"}
        return
    }
    let userinfo = await user.findOne({email: body.email})
    if (userinfo.verification === body.verification && Date.now() < userinfo.expiration) {
        try {
            await user.where({email: body.email}).update({pwd: md5(body.newpass)})
            ctx.body = {
                code: 0
            }
        } catch (e) {
            console.log(e)
        }
    }
    else
    {
        ctx.body={msg:"验证码错误或过期"}
        return
    }
}

module.exports=passchange
