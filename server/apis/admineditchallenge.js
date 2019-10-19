const challenge=require("../db/model/challengedb")

const editchallenge=async(ctx)=>{
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
