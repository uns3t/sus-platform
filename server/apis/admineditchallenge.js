const challenge=require("../db/model/challengedb")

const editchallenge=async(ctx)=>{
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
    let body=ctx.request.body
    let tempchallenge=new challenge({
        challengename:body.challengename,
        flag: body.flag,
        score: body.score,
        type: body.type,
        description: body.description,
    })
    try{
        await challenge.findOneAndUpdate({challengename:body.challengename},{
            flag: body.flag,
            score: body.score,
            type: body.type,
            description: body.description,
        })
        ctx.body={
            code:0
        }
    }catch (e) {

    }
}

module.exports=editchallenge
