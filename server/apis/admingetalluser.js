const user=require("../db/model/userdb")

const admingetusr=async(ctx)=>{
    if(ctx.state.tokencode!=1){
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
    let ret=await user.find()

    ctx.body=ret

}

module.exports=admingetusr
