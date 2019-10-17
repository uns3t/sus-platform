const user=require("../db/model/userdb")

const edituser=async(ctx)=>{
    let body=ctx.request.body

    try{
        await user.where({usrname:body.usrname}).update({pwd:body.pwd})
        ctx.body={
            code:0
        }
    }catch (e) {
        console.log(e)
    }

}

module.exports=edituser
