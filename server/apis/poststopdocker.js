const Docker = require("dockerode")
const verify = require("../tools/verify")
const user = require("../db/model/userdb")
const format = require("../tools/format")

const reqformat={
    username:String
}

const stopDocker = async (ctx) => {
    if (!verify.user_login(ctx)) {
        return
    }
    if(!format(reqformat, ctx.request.body)) {
        ctx.body = {
            msg: "数据验证不通过"
        }
        return
    }
    let body = ctx.request.body
    if(body.username !== body.username)
    {
        // 如果删的不是自己的容器
        if (ctx.state.tokencode !== 1) { // not admin
            ctx.body = {
                msg: "permission denied"
            }
            return
        }
    }

    let tempuser = await user.findOne({username: body.username})
    let docker = new Docker()
    let container =  docker.getContainer(tempuser.token)

    container.stop().then(function (data) {
        return container.remove()
    }).then(function (data){
        console.log("容器"+tempuser.token+"删除成功")
        ctx.body = {
            code: 0,
            msg: "容器删除成功"
        }
        return data
    }).catch(function (error) {
        console.log(error)
        ctx.body = {
            code: -1,
            msg: "容器删除失败"
        }
    })

    // 这样子好像会永恒成功?then和catch似乎不能赋值到外面

    ctx.body = {
        code: 0,
        msg: "容器删除成功"
    };
    // 清除之前的停止docker计时，并主动更新dockerTimeoutID
    clearTimeout(tempuser.dockerTimeout)
    await user.findOneAndUpdate({username: tempuser.username}, {dockerTimeout: null})   // 只用dockerTimeout判断是否开了docker


}

module.exports = stopDocker