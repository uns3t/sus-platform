const log=require("../db/model/logdb")

const userlog=async(ctx)=>{
    let body=ctx.request.body
    let templog=await log.find()
    console.log(templog)
    ctx.body=templog
}

module.exports=userlog
