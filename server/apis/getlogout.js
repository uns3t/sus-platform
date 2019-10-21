

const logout=async(ctx)=>{
    ctx.response.status=401
    if(ctx.state.tokencode==-1){
        return
    }

}

module.exports=logout
