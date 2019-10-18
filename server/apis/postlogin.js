const user=require("../db/model/userdb")

const login=async(ctx)=>{
    let body=ctx.request.body
    try{
        let tempuser=await user.findOne({username:body.username,pwd:body.pwd})
        console.log(tempuser)
        if(tempuser){
            //设置token，后面加
            ctx.body={code:0}
        }else {
            ctx.body={code:-1}
        }
    }catch (e) {
        console.log(e)
    }
}

module.exports=login
