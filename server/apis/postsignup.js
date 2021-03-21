const user = require("../db/model/userdb")
const format = require("../tools/format")
const md5 = require("md5-node")
const {v4: uuidv4} = require('uuid')

const reqformat = {
    username: String,
    pwd: String,
    pwdconfirm: String,
    email: String,
    ecard: String,
    studentid: String,
    phone: String,
    name: String,
    qq: String,
}

function is_email(str) {
    const reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
    return reg.test(str);
}

function is_telephone(str) {
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    return reg.test(str);
}

const signup = async (ctx) => {

    let body = ctx.request.body

    if (!format(reqformat, body.signupform)) {
        ctx.body = {
            msg: "数据验证未通过"
        }
        return
    }
    for (let v in body.signupform) {
        // 已去除空格
        body.signupform[v] = body.signupform[v].replace(/\s*/g, "");
    }
    for (let v in body.signupform) {
        if (body.signupform[v] === "") {
            ctx.body = {
                msg: "您的注册数据不能为空"
            }
            return
        }
    }
    /*
        if(body.isnotSeu){
            if(body.signupform.username==''||body.signupform.pwd==''||body.signupform.pwdconfirm==''||body.signupform.email==''){
                ctx.body={
                    msg:"您的注册数据不能为空"
                }
                return
            }

        }else {
            for (let v in body.signupform){
                if(body.signupform[v]==""){
                    ctx.body={
                        msg:"注册数据不能为空"
                    }
                    return
                }
            }
        }
        */


    // 结束注册
    // const end = "2020-10-14 00:00:00"
    // let t1 = new Date(end).getTime()
    // if(Date.now() > t1)
    // {
    //     ctx.body = {
    //         msg: "注册已结束"
    //     }
    //     return
    // }

    if (body.signupform.pwd !== body.signupform.pwdconfirm) {
        ctx.body = {msg: "两次密码不相同"}
        return
    }
    if (!is_email(body.signupform.email)) {
        ctx.body = {msg: "请输入正确的邮箱"}
        return
    }
    if (!is_telephone(body.signupform.phone)) {
        ctx.body = {msg: "请输入正确的手机号"}
        return
    }
    // console.log(body)
    let name_check = await user.find({username: body.signupform.username})
    if (name_check.length > 0) {
        ctx.body = {msg: "用户名已注册"}
        return
    }

    let mail_check = await user.find({email: body.signupform.email})
    if (mail_check.length > 0) {
        ctx.body = {msg: "邮箱已注册"}
        return
    }

    let ecard_check = await user.find({ecard: body.signupform.ecard})
    if (ecard_check.length > 0) {
        ctx.body = {msg: "该一卡通已被注册"}
        return
    }

    let tempuser = {
        username: body.signupform.username,
        pwd: md5(body.signupform.pwd),
        studentid: body.signupform.studentid,
        ecard: body.signupform.ecard,
        phone: body.signupform.phone,
        name: body.signupform.name,
        qq: body.signupform.qq,
        email: body.signupform.email,
        time: new Date(),
        token: uuidv4()     // 生成flag token
    }

    try {
        // upsert 查找到了就修改对应账户，没找到就插入，保证数据唯一无条件竞争
        await user.updateOne({$or: [{username: body.signupform.username}, {email: body.signupform.email}, {ecard: body.signupform.ecard}]}, tempuser, {upsert: true})
        ctx.body = {
            code: 0
        }
    } catch (e) {
        console.log(e)
    }


}

module.exports = signup
