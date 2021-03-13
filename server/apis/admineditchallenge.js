const challenge=require("../db/model/challengedb")
const format=require("../tools/format")
const verify = require("../tools/verify")

const reqformat={
    challengename:String,
    description:String,
    type:String,
    flag:String,
    score:String

}


const editchallenge=async(ctx)=>{
    if(!verify.admin_login(ctx))
    {
        return
    }

    let body=ctx.request.body

    if(!format(reqformat,body)){
        ctx.body={
            msg:"数据验证未通过"
        }
        return
    }
    for(let v in body){
        if(body[v]==''){
            ctx.body={
                msg:"数据不能为空"
            }
            return
        }
    }

    let test=await challenge.find({challengename:ctx.request.body.challengename})
    if(test.length===0){
        ctx.body={
            msg:"题目不存在"
        }
        return
    }
    try{
        await challenge.findOneAndUpdate({challengename:body.challengename},{
            flag: body.flag,
            originscore: body.score,
            type: body.type,
            description: body.description,
        })
        ctx.body={
            code:0
        }
    }catch (e) {
        console.log(e)
    }
}

module.exports=editchallenge
