const challenge=require("../db/model/challengedb")
const log=require("../db/model/logdb")
const verify=require("../tools/verify")

//不需要数据验证

const postchallenge=async(ctx)=>{

    if(!verify.user_login(ctx))
    {
        return
    }
    // const start_time = "2020-10-17 10:00:00"
    // if(ctx.state.tokencode !== 1 && Date.now() < new Date(start_time).getTime())
    // {
    //     ctx.body = {
    //         msg: "比赛尚未开始"
    //     }
    //     return
    // }

    let challenges=await challenge.find()
    let retcha=challenges.map((v)=>{
        v.flag=undefined
        return v
    })
    let usercha=await log.find({username:ctx.state.userinfo.username})
    let ret={}
    for(let val1 of retcha){
        ret[val1.type]=[]
    }

    for(let val1 of retcha){
        let solved=false
        for(let val2 of usercha){
            if(val1.challengename==val2.challengename&&val2.issolved==true){
                solved=true
            }
        }
        ret[val1.type].push({
            value:val1,
            solved:solved
        })
    }

    console.log(ret)

    ctx.body={
        challenge:ret
    }


    //需要在log中获取该用户已解答的题目
}

module.exports=postchallenge
