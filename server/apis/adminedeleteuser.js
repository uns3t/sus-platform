const user=require("../db/model/userdb")
const log=require("../db/model/logdb")
const verify = require("../tools/verify")

const reqformat={
    username:String
}

const admindeleteuser=async(ctx)=>{
    if(!verify.admin_login(ctx))
    {
        return
    }
    if(!format(reqformat,body.userform)) {
        ctx.body = {
            msg: "数据验证不通过"
        }
        return
    }

    let tempuser =  await user.findOne({username: reqformat.username})
    if(tempuser.length > 0)
    {
        try {
            await user.deleteOne({username: reqformat.username})
            await log.deleteMany({username: reqformat.username})
        }
        catch (e) {
            console.log(e)
        }
    }
    else
    {
        ctx.body = {
            msg: "该用户不存在"
        }
    }

}

module.exports = admindeleteuser;