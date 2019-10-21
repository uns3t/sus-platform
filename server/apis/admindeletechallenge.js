const challenge=require("../db/model/challengedb")

const deletechallenge=async(ctx)=>{
    if(ctx.state.tokencode!=1){
        ctx.response.status=401
        return
    }

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
