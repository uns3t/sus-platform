const user=require("../db/model/userdb")

const edituser=async(ctx)=>{
    if(ctx.state.tokencode==-1){
        ctx.response.status=401
        return
    }
    let body=ctx.request.body
    //注意验证信息

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
