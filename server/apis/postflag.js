const user=require("../db/model/userdb")
const challenge=require("../db/model/challengedb")
const log=require("../db/model/logdb")


const submitflag=async(ctx)=>{
    let body=ctx.request.body
    let cha=await challenge.findOne({challengename:body.challengename})
    console.log(cha)
    if(cha.flag==body.flag){
        let templog=new log({
            username:body.username,
            challengename:body.challengename,
            submittime: new Date(),
            type: cha.type,
            solvedscore: cha.score,
            issovled:true,
            flag:body.flag
        })
        await templog.save()
        let tempuser=await user.findOne({username: body.username})
        tempuser.userscore+=cha.score
        console.log(cha.solved)
        await user.where({username:body.username}).update({userscore:tempuser.userscore})
        await challenge.where({challengename:cha.challengename}).update({solved: cha.solved+1,submit:cha.submit+1})
        ctx.body={
            code:0
        }
    }else {
        let templog=new log({
            username:body.username,
            challengename:body.challengename,
            submittime: new Date(),
            type: cha.type,
            solvedscore: cha.score,
            issovled:false,
            flag:body.flag
        })
        await templog.save()
        let submitnum=cha.submit+1
        await challenge.where({challengename:cha.challengename}).update({submit:submitnum})
        ctx.body={
            code:-1
        }
    }
}

module.exports=submitflag
