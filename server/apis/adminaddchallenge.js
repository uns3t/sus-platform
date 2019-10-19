const challenge=require("../db/model/challengedb")

const addchallenge=async(ctx)=>{
    let body=ctx.request.body
    let tempchallenge=new challenge({
        challengename:body.challengename,
        flag: body.flag,
        score: body.score,
        type: body.type,
        description: body.description,
    })
    try{
        await tempchallenge.save()
    }catch (e) {

    }
}

module.exports=addchallenge
