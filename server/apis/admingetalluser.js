const user=require("../db/model/userdb")
const verify = require("../tools/verify")

const admingetusr=async(ctx)=>{
    if(!verify.admin_login(ctx))
    {
        return
    }
    let ret=await user.find()

    ctx.body=ret

}

module.exports=admingetusr
