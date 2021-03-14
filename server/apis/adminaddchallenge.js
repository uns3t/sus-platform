const challenge=require("../db/model/challengedb")
const challengeInfo = require("../tools/challengeInfo")
const verify = require("../tools/verify")
const format=require("../tools/format")

const reqformat={
    challengename:String,
    description:String,
    type:String,
    flag:String,
    score:String,
    isDynamic: Boolean,
    imageName: String,
    port: Number
}

const addchallenge=async(ctx)=>{

    if(!verify.admin_login(ctx))
    {
        return
    }

    let body=ctx.request.body

    // 可能会有问题？
    if(!format(reqformat,body)){
        ctx.body={
            msg:"数据验证未通过"
        }
        return
    }

    // 相信管理员不要操作失误了。。。。
    // for(let v in body){
    //     if(body[v]==''){
    //         ctx.body={
    //             msg:"数据不能为空"
    //         }
    //         return
    //     }
    // }
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
            originscore: body.score,
            type: body.type,
            description: body.description,
            isDynamic: body.isDynamic,
            imageName: body.imageName,
            port: body.port
        })
        try{
            await tempchallenge.save()
            challengeInfo.setInfo(tempchallenge.challengename, tempchallenge.originscore)
            ctx.body={
                code:0
            }
        }catch (e) {
            console.log(e)
        }
    }

}

module.exports=addchallenge
