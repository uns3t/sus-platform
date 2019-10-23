const challenge=require("../db/model/challengedb")
const log=require("../db/model/logdb")
const format=require("../tools/format")

const reqformat={
    challengename:String,


}
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
    if(!format(reqformat,ctx.request.body)){
        ctx.body={
            msg:"数据验证未通过"
        }
        return
    }
    if(ctx.request.body.challengename==''){
        ctx.body={
            msg:"数据不能为空"
        }
        return
    }

    try{
        let test=await challenge.find({challengename:ctx.request.body.challengename})
        console.log("----------")
        console.log(test.length)
        if(test.length==0){
            ctx.body={
                msg:"题目不存在"
            }
            return
        }
        await challenge.where({challengename:ctx.request.body.challengename}).remove()
        await log.where({challengename:ctx.request.body.challengename}).remove()
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
