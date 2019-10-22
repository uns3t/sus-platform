const challenge=require("../db/model/challengedb")
const log=require("../db/model/logdb")


const postchallenge=async(ctx)=>{

    if(ctx.state.tokencode==-1){
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
    console.log("--------------------------")
    console.log(ctx.request.body)
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
