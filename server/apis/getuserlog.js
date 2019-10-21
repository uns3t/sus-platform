const log=require("../db/model/logdb")

const userlog=async(ctx)=>{
    if(ctx.state.tokencode!=1){

        ctx.response.status=401
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
