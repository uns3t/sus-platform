const Docker = require("dockerode")
const verify = require("../tools/verify")
const user = require("../db/model/userdb")

const refreshDocker = async() => {
    if (!verify.user_login(ctx)) {
        return
    }

    let tempuser = await user.findOne({username: ctx.state.userinfo.username})
    let docker = new Docker()
    let auxContainer = docker.getContainer(tempuser.token)
    if(tempuser.dockerTimeout !== null)
    {
        // 清除当前的定时任务并重启一个定时任务
        clearTimeout(tempuser.dockerTimeout)
        let timeoutID = setTimeout(function () {
            auxContainer.stop()
            auxContainer.remove()
            user.findOneAndUpdate({username: tempuser.username}, {dockerTimeout: null})
        }, 7200 * 1000)   // 2h
        user.findOneAndUpdate({username: tempuser.username}, {dockerTimeout: timeoutID})    }
    else{
        ctx.body = {
            msg: "没有已创建的容器"
        }
    }

}

module.exports = refreshDocker