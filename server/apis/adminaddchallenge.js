const challenge=require("../db/model/challengedb")

const addchallenge=async(ctx)=>{

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
    let check=await challenge.find({challengename:body.challengename})
    if(check.length>0){
        ctx.body={
            msg:"题目名重复请重新添加"
        }
    }else {
        let tempchallenge=new challenge({
            challengename:body.challengename,
            flag: body.flag,
            score: body.score,
            type: body.type,
            description: body.description,
        })
        try{
            await tempchallenge.save()
            ctx.body={
                code:0
            }
        }catch (e) {

        }
    }

}

module.exports=addchallenge