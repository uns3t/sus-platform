const Docker = require("dockerode")
const verify = require("../tools/verify")
const user = require("../db/model/userdb")
const moment = require("moment")

const refreshDocker = async (ctx) => {
    if (!verify.user_login(ctx)) {
        return
    }
    let body;
    let tempuser = await user.findOne({username: ctx.state.userinfo.username})
    let docker = new Docker()
    if (tempuser.dockerTimeout !== null) {  //先判断有没有容器再去获取
        // 清除当前的定时任务并重启一个定时任务
        let auxContainer = docker.getContainer(tempuser.token)
        clearTimeout(tempuser.dockerTimeout)
        let timeoutID = setTimeout(function () {
            auxContainer.stop().then(function (data) {
                return auxContainer.remove()
            }).catch(function (error) {
                console.log(error)
            })
        }, 7200 * 1000)   // 2h
        timeoutID = Number("" + timeoutID)
        console.log("容器" + tempuser.token + "刷新成功")
        // 好吧，不加await会直接暴毙
        await user.findOneAndUpdate({username: tempuser.username}, {dockerTimeout: timeoutID, timestamp: +moment()}) //加上await
        body = {
            code: 0,
            msg: "容器刷新成功",
        }
        // ctx.cookies.set('dockerTimeStamp', +moment(), {overwrite: true, httpOnly: false})
    } else {
        body = {
            code: -1,
            msg: "没有已创建的容器"
        }
    }
    // console.log(body)
    ctx.body = body
}

module.exports = refreshDocker