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
    // 怎么会有人设计出来没同时给opts和fallback就把opts赋给fallback的
    // container.stop(function (error, data){
    //     if(error)
    //     {
    //         body = {
    //             code: -1,
    //             msg: "容器停止失败"
    //         }
    //         console.log(error)
    //     }
    //     else
    //     {
    //         console.log(data)
    //         body = {
    //             code: 0,
    //             msg: "容器清除成功"
    //         }
    //     }
    // })
    body = {
        code: 0,
        msg: "容器删除成功"
    }
    let res = await user.findOneAndUpdate({username: tempuser.username}, {$set:{dockerTimeout: null}})
    container.remove(function (error, data){  //remove 自带stop 重复使用会GG
        if(error)
        {
            console.log(error)
            body = {
                code: -1,
                msg: "容器删除失败"
            }
        }
    })
    ctx.body = body;
    // 清楚之前的停止docker计时，并主动更新dockerTimeoutID
    clearTimeout(tempuser.dockerTimeout)
    ctx.cookies.set('dockerTimeStamp',null,{overwrite:true,httpOnly:false})
    ctx.cookies.set('port',null,{overwrite:true,httpOnly:false})
    ctx.cookies.set('dockerChallenge',null,{overwrite:true,httpOnly:false})
}

module.exports = stopDocker