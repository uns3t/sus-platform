const Docker = require("dockerode")
const md5 = require("md5-node")
const challenge = require("../db/model/challengedb")
const verify = require("../tools/verify")
const format = require("../tools/format")
const user = require("../db/model/userdb")
const moment = require('moment')
const isPortReachable = require('is-port-reachable')

const reqformat = {
    challengename: String,
}

const flag_format = "SUSCTF{$}"

const createDocker = async (ctx) => {
    if (!verify.user_login(ctx)) {
        return
    }
    let body = ctx.request.body

    if (!format(reqformat, body)) {
        ctx.body = {
            msg: "数据验证不通过"
        }
        return
    }

    // challenge name 允许空格存在

    let cha = await challenge.findOne({challengename: body.challengename})
    let tempuser = await user.findOne({username: ctx.state.userinfo.username})
    // console.log(ctx.state.userinfo.username)

    // 判断能否启动docker
    if (cha === undefined || !cha.hasDocker) {
        ctx.body = {
            code: -1,
            msg: "题目不存在或不能动态启动docker"
        }
    } else if (tempuser.dockerTimeout !== null) {
        ctx.body = {
            code: 1,
            msg: "一个用户同一时间只能创建一个容器"
        }
    } else {
        // 获取1-2w之间的一个端口，随机产生，之前是顺序的
        let port = parseInt(Math.random() * 10000 + 10000, 10)
        let res = await isPortReachable(port)
        while (res)     // reachabley意味着这里有服务以及被占用了
        {
            port = parseInt(Math.random() * 10000 + 10000, 10)
            res = await isPortReachable(port, 'localhost')

        }

        // console.log(port)
        // 目前的想法应该是build通用的image，用image起container的时候要动态绑定端口，起来之后再execflag下发脚本修改flag
        let docker = new Docker()
        let auxContainer;
        let opt = {
            Image: cha.imageName,  /*用哪个镜像*/
            name: tempuser.token,
            ExposedPorts: {},
            HostConfig: {PortBindings: {}},
        }
        opt.ExposedPorts[cha.port.toString() + "/tcp"] = {}
        opt.HostConfig.PortBindings[cha.port.toString() + "/tcp"] = [{"HostPort": port.toString()}]
        await docker.createContainer(opt).then(function (container) {
            //这里异步逻辑要注意 不然数据库是不会更新的(大概就是then里面不能异步吧?)
            auxContainer = container
            return auxContainer.start()
        }).then(function (data) {
            // 只对动态flag进行flag下发，允许能起docker但flag固定的情形
            if (cha.isDynamic === true) {
                auxContainer.exec({
                    Cmd: ["/bin/bash", "-c", "/service.sh"],
                    Env: ["flag=" + flag_format.replace("$", md5(cha.flag + tempuser.token))]
                }).then(function (exec) {
                    // log docker flag
                    // console.log("flag=" + flag_format.replace("$", md5(cha.flag + tempuser.token)))
                    return exec.start({hijack: false, stdin: false})
                }).catch(function (error) {
                    console.log(error)
                })
            }

            console.log("container " + tempuser.token + " started")
            return data     // 返回之前的成功
        }).catch(function (error) {
            console.log(error)
        })
        // 创建一个定时任务，并把定时任务id存进数据库
        let timeoutID = setTimeout(function () {
            auxContainer.stop().then(function (data) {
                return auxContainer.remove()
            }).catch(function (error) {
                if (error) {
                    console.log("容器" + tempuser.token + "删除失败")
                    console.log(error)
                }
            })
            user.findOneAndUpdate({username: tempuser.username}, {dockerTimeout: null})
        }, 3600 * 1000)   // 1h
        timeoutID = Number(timeoutID) //number化 timeout返回值是object，就这样也能用
        await user.findOneAndUpdate({username: tempuser.username}, {
            dockerTimeout: timeoutID,
            port: port,
            timestamp: +moment(),    // unix时间戳
            challengename: cha.challengename
        })
        ctx.body = {
            code: 0,
        }

    }

}


module.exports = createDocker