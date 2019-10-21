const user=require("../db/model/userdb")
const jwttools=require("../tools/token")
const susconfig=require('../susplatformconfig')

const login=async(ctx)=>{

    let body=ctx.request.body
    try{
        if(body.username==susconfig.admin.username&&body.pwd==susconfig.admin.pwd){
            let info={
                username:body.username,
                isadmin:1
            }
            console.log("----------admin登陆")
            let token=jwttools.jwtencode(info)
            ctx.body={code:0,token:token}
        }else {
            let tempuser=await user.findOne({username:body.username,pwd:body.pwd})
            console.log(tempuser)
            if(tempuser){
                let info={
                    username:body.username,
                    isadmin:0
                }
                let token=jwttools.jwtencode(info)
                ctx.body={code:0,token:token}
            }else {
                ctx.body={code:-1}
            }
        }

    }catch (e) {
        console.log(e)
    }
}

module.exports=login
