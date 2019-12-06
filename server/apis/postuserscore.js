const log=require("../db/model/logdb")
const user=require("../db/model/userdb")
const challenge=require("../db/model/challengedb")
const format=require("../tools/format")

const reqformat={
    username:String,
}



const userscore=async(ctx)=>{
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

    let body={}

    if(Object.keys(ctx.request.body).length!=0){
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
    let socre=await user.find()
    let compare=(obj1,obj2)=>{
        var val1 = obj1.userscore;
        var val2 = obj2.userscore;
        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else if(val1==val2){
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
    socre.sort(compare)
    let index=0
    for(let temp of socre){
        index++
        if(temp.username==body.username){
            break
        }
    }
    let templog=await log.find({username:body.username})

    for(let temp of templog){
        if(temp.issolved){
            forechart[temp.type][0]+=1
        }
    }

    let chas=await challenge.find()
    for(let temp of chas){
        forechart[temp.type][1]+=1
    }

    let newrelog=[]
    templog.map((v,i,e)=>{
        if(v.issolved){
            newrelog.push({username:v.username,challengename:v.challengename,submittime:v.submittime,
                solvedscore:v.solvedscore,type:v.type,issolved:"yes"})
        }
        else {
            newrelog.push({username:v.username,challengename:v.challengename,submittime:v.submittime,
                solvedscore:v.solvedscore,type:v.type,issolved:"no"})
        }
    })


    let ret={
        rank:index,
        echartdata:forechart,
        challengelog:newrelog
    }

    console.log(ret)
    ctx.body=ret
}

module.exports=userscore
