const Docker = require("dockerode")
const verify = require("../tools/verify")
const user = require("../db/model/userdb")

const stopDocker = async (ctx) => {
    if (!verify.user_login(ctx)) {
        return
    }

    let tempuser = await user.findOne({username: ctx.state.userinfo.username})
    let docker = new Docker()
    let container =  docker.getContainer(tempuser.token)
    let body;

    await user.findOneAndUpdate({username: tempuser.username}, {$set:{dockerTimeout: null}})
    // container.remove(function (error, data){  //remove 自带stop 重复使用会GG
    //     if(error)
    //     {
    //         console.log(error)
    //         body = {
    //             code: -1,
    //             msg: "容器删除失败"
    //         }
    //     }
    // })

    // 这里在then里面的不会回显?
    container.stop().then(function (data) {
        return container.remove()
    }).then(function (data){
        console.log("容器"+tempuser.token+"删除成功")
        body = {
            code: 0,
            msg: "容器删除成功"
        }
    }).catch(function (error) {
        console.log(error)
        body = {
            code: -1,
            msg: "容器删除失败"
        }
    })

    // 这样子好像会永恒成功?then和catch似乎不能赋值到外面
    body = {
        code: 0,
        msg: "容器删除成功"
    }

    ctx.body = body;
    // 清除之前的停止docker计时，并主动更新dockerTimeoutID
    clearTimeout(tempuser.dockerTimeout)
    ctx.cookies.set('dockerTimeStamp',null,{overwrite:true,httpOnly:false})
    ctx.cookies.set('port',null,{overwrite:true,httpOnly:false})
    ctx.cookies.set('dockerChallenge',null,{overwrite:true,httpOnly:false})
}

module.exports = stopDocker