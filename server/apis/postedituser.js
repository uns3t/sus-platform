const user=require("../db/model/userdb")
const md5 = require("md5-node")
const format=require("../tools/format")
const verify=require("../tools/verify")

const reqformat={
    username:String,
    pwd:String,
    pwdconfirm:String,
    email:String,
    qq:String,
    phone:String,
}

// 改个人信息，密码md5存储
const edituser=async(ctx)=>{
    if(!verify.user_login(ctx))
    {
        return
    }
    let body=ctx.request.body
    if(!format(reqformat,body.userform)){
        ctx.body={
            msg:"数据验证不通过"
        }
        return
    }
    for(let v of body.userform){
        body.userform[v]=body.userform[v].replace(/\s*/g,"");
    }
    //注意验证信息
    console.log(body)
    if(body.userform.pwd!==body.userform.pwdconfirm){
        ctx.body={msg:"两次密码不相同"}
        return
    }

    try{
        await user.findOneAndUpdate({username:ctx.state.userinfo.username},{pwd:md5(body.userform.pwd),email:body.userform.email,qq:body.userform.qq,phone:body.userform.phone})
        ctx.body={
            code:0
        }
    }catch (e) {
        console.log(e)
    }

}

module.exports=edituser
