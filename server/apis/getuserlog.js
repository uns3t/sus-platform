const log=require("../db/model/logdb")
const verify=require("../tools/verify")

//不需要数据验证

const userlog=async(ctx)=>{
    if(!verify.admin_login(ctx))
    {
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
