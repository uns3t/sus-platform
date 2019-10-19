const challenge=require("../db/model/challengedb")
const log=require("../db/model/logdb")


const postchallenge=async(ctx)=>{
    console.log("--------------------------")
    console.log(ctx.request.body)
    let challenges=await challenge.find()
    let usercha=await log.find({username:ctx.request.body.username})
    let ret={}
    for(let val1 of challenges){
        ret[val1.type]=[]
    }

    for(let val1 of challenges){
        let sovled=false
        for(let val2 of usercha){
            if(val1.challengename==val2.challengename){
                sovled=true
            }
        }
        ret[val1.type].push({
            value:val1,
            sovled:sovled
        })
    }

    console.log(ret)

    ctx.body=ret


    //需要在log中获取该用户已解答的题目
}

module.exports=postchallenge
