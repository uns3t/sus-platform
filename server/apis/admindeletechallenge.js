const challenge=require("../db/model/challengedb")

const deletechallenge=async(ctx)=>{
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
    // if(ctx.state.userinfo.expires>Date.now()){
    //     ctx.body={
    //         msg:"登陆Token过期，请重新登陆"
    //     }
    //     return
    // }
    try{
        await challenge.where({challengename:ctx.request.body.challengename}).remove()
        ctx.body={
            code:0
        }
    }catch (e) {
        ctx.body={
            msg:e
        }
    }

}

module.exports=deletechallenge
