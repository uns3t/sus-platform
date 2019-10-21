const user=require("../db/model/userdb")

const admingetusr=async(ctx)=>{
    if(ctx.state.tokencode!=1){
        return
    }
}

module.exports=admingetusr
