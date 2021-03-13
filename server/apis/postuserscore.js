const log=require("../db/model/logdb")
const user=require("../db/model/userdb")
const challenge=require("../db/model/challengedb")
const challengeInfo = require("../tools/challengeInfo")
const verify=require("../tools/verify")
const format=require("../tools/format")

const reqformat={
    username:String,
}



const userscore=async(ctx)=>{
    if(!verify.user_login(ctx))
    {
        return
    }

    let body

    if(Object.keys(ctx.request.body).length!==0){
        format(reqformat,ctx.request.body)
        body=ctx.request.body
    }else {

        body=ctx.state.userinfo

    }
    console.log(body)
    let forechart={
        pwn:[0,0],
        reserve:[0,0],
        web:[0,0],
        misc:[0,0],
        crypto:[0,0],
    }
    let score=await user.find()

    for (let tmpuser in score) {
        tmpuser.userscore = 0
            for (let cha in tmpuser.solved) {
                tmpuser.userscore += challengeInfo.getInfo(cha).score
            }
        }


    let compare=(obj1,obj2)=>{
        var val1 = obj1.userscore;
        var val2 = obj2.userscore;
        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else if(val1===val2){
            if (obj1.time > obj2.time) {
                return 1;
            } else if (obj1.time < obj2.time) {
                return -1;
            } else {
                return 0;
            }
        }
        else {
            return 0;
        }
    }
    score.sort(compare)
    let index=0
    for(let temp of score){
        index++
        if(temp.username===body.username){
            break
        }
    }
    let templog=await log.find({username:body.username})
    let solvedCha = score[index - 1].solved;


    // 做出来该方向题的分数和该方向题总分
    for(let cha of solvedCha){
        forechart[temp.type][0]+=challengeInfo.getInfo(cha).score
    }

    let chas=await challenge.find()
    for(let temp of chas){
        forechart[temp.type][1]+=temp.score
    }

    let newrelog=[]
    templog.map((v,i,e)=>{
        if(v.issolved){
            newrelog.push({username:v.username,challengename:v.challengename,submittime:v.submittime,
                type:v.type,issolved:"yes"})
        }
        else {
            newrelog.push({username:v.username,challengename:v.challengename,submittime:v.submittime,
                type:v.type,issolved:"no"})
        }
    })


    let ret={
        rank:index,
        echartdata:forechart,
        challengelog:newrelog
    }

   // console.log(ret)
    ctx.body=ret
}

module.exports=userscore
