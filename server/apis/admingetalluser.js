const user=require("../db/model/userdb")

const admingetusr=async(ctx)=>{
    ctx.response.status=401
    if(ctx.state.tokencode!=1){
        return
    }
}

module.exports=admingetusr
