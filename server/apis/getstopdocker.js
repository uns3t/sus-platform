const Docker = require("dockerode")
const verify = require("../tools/verify")
const user = require("../db/model/userdb")

const stopDocker = async (ctx) => {
    if (!verify.user_login(ctx)) {
        return
    }

    let tempuser = await user.findOne({username: ctx.state.userinfo.username})
    let docker = new Docker()
    let container = docker.getContainer(tempuser.token)

    // 怎么会有人设计出来没同时给opts和fallback就把opts赋给fallback的
    container.stop(function (error, data){
        if(error)
        {
            ctx.body = {
                msg: "error occurred"
            }
            console.log(error)
        }
        else
        {
            console.log(data)
            ctx.body = {
                msg: data
            }
        }
    })
    container.remove(function (error, data){
        if(error)
        {
            console.log(error)
        }
    })
    // 清楚之前的停止docker计时，并主动更新dockerTimeoutID
    clearTimeout(tempuser.dockerTimeout)
    user.findOneAndUpdate({username: tempuser.username}, {dockerTimeout: null})

}

module.exports = stopDocker