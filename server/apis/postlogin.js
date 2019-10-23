const user=require("../db/model/userdb")
const jwttools=require("../tools/token")
const susconfig=require('../susplatformconfig')
const format=require("../tools/format")

const reqformat={
    username:String,
    pwd:String
}

const login=async(ctx)=>{
    let body=ctx.request.body
    console.log(body)
    if(!format(reqformat,body)){
        ctx.body={
            msg:"数据验证未通过"
        }
        return
    }
    try{
        if(body.username==''||body.pwd==''){
            ctx.body={
                msg:"输入不能为空"
            }
            return
        }
        for(let v in body){
            body[v]=body[v].replace(/\s*/g,"");
        }
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
                ctx.body={
                    msg:"用户名或密码错误"
                }
            }
        }

    }catch (e) {
        console.log(e)
    }
}

module.exports=login
