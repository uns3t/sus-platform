const user=require("../db/model/userdb")
const format=require("../tools/format")
const md5 = require("md5-node")
import { v4 as uuidv4 } from 'uuid';

const reqformat={
    username:String,
    pwd:String,
    pwdconfirm:String,
    email:String,
    ecard:String,
    studentid:String,
    phone:String,
    name:String,
    qq:String,
}

function is_email(str)
{
    // TODO 会不会吃ReDOS啊。。。有待考据
    const reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
    return reg.test(str);
}

function is_telephone(str)
{
    const reg = /^1[3456789]\d{9}$/;
    return reg.test(str);
}

const signup=async(ctx)=>{

    let body=ctx.request.body

    if(!format(reqformat,body.signupform)){
        ctx.body={
            msg:"数据验证未通过"
        }
        return
    }
    for (let v in body.signupform){
        if(body.signupform[v]==""){
            ctx.body={
                msg:"您的注册数据不能为空"
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
    for(let v in body.signupform){
        // 已去除空格
        body.signupform[v]=body.signupform[v].replace(/\s*/g,"");
    }

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

    if(body.signupform.pwd!==body.signupform.pwdconfirm){
        ctx.body={msg:"两次密码不相同"}
        return
    }
    if(!is_email(body.signupform.email))
    {
        ctx.body={msg:"请输入正确的邮箱"}
        return
    }
    if(!is_telephone(body.signupform.phone))
    {
        ctx.body={msg:"请输入正确的手机号"}
        return
    }
    // console.log(body)
    let name_check= await user.find({username: body.signupform.username})
    if(name_check.length>0)
    {
        ctx.body={msg:"用户名已注册"}
        return
    }

    let mail_check = await user.find({email: body.signupform.email})
    if (mail_check.length>0) {
        ctx.body={msg:"邮箱已注册"}
        return
    }

    let ecard_check = await user.find({ecard: body.signupform.ecard})
    if(ecard_check.length>0)
    {
        ctx.body={msg:"该一卡通已被注册"}
        return
    }

    let tempuser = new user({
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
    })

    try {
        await tempuser.save()
        ctx.body = {
            code: 0
        }
    } catch (e) {
        console.log(e)
    }


}

module.exports=signup
