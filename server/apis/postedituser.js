const user=require("../db/model/userdb")

const format=require("../tools/format")

const reqformat={
    username:String,
    pwd:String,
    pwdconfirm:String,
    email:String,
    qq:String,
    phone:String,
}

const edituser=async(ctx)=>{
    if(ctx.state.tokencode==-1){
        ctx.body={
            msg:"401"
        }
        return
    }
    if(ctx.state.userinfo.expires<Date.now()){
        ctx.body={
            msg:"登陆Token过期，请重新登陆"
        }
        return
    }
    let body=ctx.request.body
    if(!format(reqformat,body)){
        ctx.body={
            msg:"数据验证不通过"
        }
        return
    }
    //注意验证信息
    if(body.pwd!=body.pwdconfirm){
        ctx.body={msg:"两次密码不相同"}
        return
    }

    try{
        await user.where({username:ctx.state.userinfo.username}).update({pwd:body.pwd,email:body.email,qq:body.qq,phone:body.phone})
        ctx.body={
            code:0
        }
    }catch (e) {
        console.log(e)
    }

}

module.exports=edituser
