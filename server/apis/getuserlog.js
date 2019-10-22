const log=require("../db/model/logdb")

//不需要数据验证

const userlog=async(ctx)=>{
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

    let templog=await log.find()
    let newrelog=[]
    templog.map((v,i,e)=>{
        if(v.issolved){
            newrelog.push({username:v.username,challengename:v.challengename,submittime:v.submittime,flag:v.flag,
                solvedscore:v.solvedscore,type:v.type,issolved:"yes"})
        }
        else {
            newrelog.push({username:v.username,challengename:v.challengename,submittime:v.submittime,flag:v.flag,
                solvedscore:v.solvedscore,type:v.type,issolved:"no"})
        }
    })
    ctx.body=newrelog
}

module.exports=userlog
