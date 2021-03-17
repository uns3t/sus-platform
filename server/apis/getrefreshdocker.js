const Docker = require("dockerode")
const verify = require("../tools/verify")
const user = require("../db/model/userdb")
const moment = require("moment")
const refreshDocker = async(ctx) => {
    if (!verify.user_login(ctx)) {
        return
    }
    let body;
    let tempuser = await user.findOne({username: ctx.state.userinfo.username})
    let docker = new Docker()
    let auxContainer =  docker.getContainer(tempuser.token)
    if(tempuser.dockerTimeout !== null)
    {
        // 清除当前的定时任务并重启一个定时任务
        clearTimeout(tempuser.dockerTimeout)
        let timeoutID = setTimeout(function () {
            auxContainer.stop()
            auxContainer.remove()
            user.findOneAndUpdate({username: tempuser.username},  {$set:{dockerTimeout: null}})
        }, 7200 * 1000)   // 2h
        timeoutID = Number(""+timeoutID)
        user.findOneAndUpdate({username: tempuser.username},  {$set:{dockerTimeout: timeoutID}})   
        body = {
            code: 0,
            msg: "容器刷新成功",
        }
        ctx.cookies.set('dockerTimeStamp',+moment(),{overwrite:true,httpOnly:false})
    }else{
        body = {
            code: -1,
            msg: "没有已创建的容器"
        }
    }
    console.log(body)
    ctx.body = body
}

module.exports = refreshDocker