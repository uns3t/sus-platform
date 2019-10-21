const challenge=require("../db/model/challengedb")

const addchallenge=async(ctx)=>{
    if(ctx.state.tokencode!=1){
        ctx.response.status=401
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
    ctx.body={
        code:0
    }
    try{
        await tempchallenge.save()
    }catch (e) {

    }
}

module.exports=addchallenge
