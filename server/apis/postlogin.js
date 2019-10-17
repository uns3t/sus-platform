const user=require("../db/model/userdb")

const login=async(ctx)=>{
    let body=ctx.request.body
    try{
        let tempuser=await tempuser.findone({usrname:body.username,pwd:body.pwd})
        if(tempuser){

            //设置token，后面加
            ctx.body={code:0}
        }
    }catch (e) {
        console.log(e)
    }
}

module.exports=login
