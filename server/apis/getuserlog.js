const log=require("../db/model/logdb")

const userlog=async(ctx)=>{
    if(ctx.state.tokencode==-1){
        ctx.response.status=401
        return
    }
    let body=ctx.request.body
    let templog=await log.find()
    let ret=[]
    if(ctx.state.tokencode==0){
        ret=templog.map((v)=>{
            v.flag=undefined
            return v
        })
    }else {
        ret=templog
    }

    console.log(ret)
    ctx.body=ret
}

module.exports=userlog
