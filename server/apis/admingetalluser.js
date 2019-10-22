const user=require("../db/model/userdb")

const admingetusr=async(ctx)=>{
    if(ctx.state.tokencode!=1){
        ctx.response.status=401

        return
    }
    let ret=await user.find()

    ctx.body=ret

}

module.exports=admingetusr
