const user=require("../db/model/userdb")

const edituser=async(ctx)=>{
    if(ctx.state.tokencode==-1){
        return
    }
    let body=ctx.request.body

    try{
        await user.where({username:body.username}).update({pwd:body.pwd,email:body.email,qq:body.qq,phone:body.phone})
        ctx.body={
            code:0
        }
    }catch (e) {
        console.log(e)
    }

}

module.exports=edituser
