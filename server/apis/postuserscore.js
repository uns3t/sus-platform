const log=require("../db/model/logdb")
const user=require("../db/model/userdb")
const challenge=require("../db/model/challengedb")

const userscore=async(ctx)=>{
    if(ctx.state.tokencode==-1){
        ctx.response.status=401
        return
    }
    let body=ctx.request.body
    console.log(body)
    let forechart={
        pwn:[0,0],
        re:[0,0],
        web:[0,0],
        misc:[0,0],
        crypto:[0,0],
    }
    let socre=await user.find()
    let compare=(obj1,obj2)=>{
        var val1 = obj1.userscore;
        var val2 = obj2.userscore;
        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }
    }
    socre.sort(compare)
    let index=0
    for(let temp of socre){
        index++
        if(temp.username==body.username){
            break
        }
    }
    console.log(body)
    let templog=await log.find({username:body.username})
    console.log(body)

    for(let temp of templog){
        if(!forechart[temp.type]){
            forechart[temp.type]=[0,0]
        }
        if(temp.issolved){
            forechart[temp.type][0]+=1
        }
    }

    let chas=await challenge.find()
    for(let temp of chas){
        forechart[temp.type][1]++
    }
    let retlog=templog.map((v,i,e)=>{
        v.flag=undefined
        return v
    })
    console.log("retlog"+retlog)

    let ret={
        rank:index,
        echartdata:forechart,
        challengelog:retlog
    }

    console.log(ret)
    ctx.body=ret
}

module.exports=userscore
