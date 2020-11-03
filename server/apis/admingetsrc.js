const src=require("../db/model/susrcdb")
const verify = require("../tools/verify")

const getsusrc=async(ctx)=> {
    if(!verify.admin_login(ctx))
    {
        return
    }
    ctx.body=await src.find()

}

module.exports=getsusrc
