const challenge=require("../db/model/challengedb")

const deletechallenge=async(ctx)=>{
    try{
        await challenge.where({challengename:ctx.request.body.challengename}).remove()
    }catch (e) {

    }
    ctx.body={
        code:0
    }
}

module.exports=deletechallenge
