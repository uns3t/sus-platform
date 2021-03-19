const Docker = require("dockerode")
const md5 = require("md5-node")
const challenge = require("../db/model/challengedb")
const getPort = require("get-port")
const verify = require("../tools/verify")
const format = require("../tools/format")
const user = require("../db/model/userdb")
const moment = require('moment')
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
    for (let v of body) {
        body[v] = body[v].replace(/\s*/g, "");        //过滤空格
    }
    let cha = await challenge.find({challengename: body.challengename})
    cha = cha[0]
    let tempuser = await user.findOne({username: ctx.state.userinfo.username})
    console.log(ctx.state.userinfo.username)

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
        // 获取1-2w之间的一个端口
        let port = await getPort({port: getPort.makeRange(10000, 20000)})
        console.log(port)
        // 目前的想法应该是build通用的image，用image起container的时候要动态绑定端口，起来之后再execflag下发脚本修改flag
        let docker = new Docker()
        let auxContainer;
        let opt = {
            Image: cha.imageName,  /*用哪个镜像*/
            name: tempuser.token,
            ExposedPorts: {},
            HostConfig: {PortBindings: {}},
        }
        let timeoutID;
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
            // 创建一个定时任务，并把定时任务id存进数据库
            timeoutID = setTimeout(function () {
                auxContainer.stop().then(function (data) {
                    return auxContainer.remove()
                }).catch(function (error) {
                    if (error) {
                        console.log("容器" + tempuser.token + "删除失败")
                    }
                })
                user.findOneAndUpdate({username: tempuser.username}, {$set: {dockerTimeout: null}})
            }, 7200 * 1000)   // 2h
            timeoutID = Number("" + timeoutID) //number化 timeout返回值是object
        }).catch(function (error) {
            console.log(error)
        })
        await user.findOneAndUpdate({username: tempuser.username}, {dockerTimeout: timeoutID})
        ctx.body = {
            code: 0,
        }
        ctx.cookies.set('port', port.toString(), {overwrite: true, httpOnly: false})
        ctx.cookies.set('dockerTimeStamp', +moment(), {overwrite: true, httpOnly: false})
        ctx.cookies.set('dockerChallenge', body.challengename, {overwrite: true, httpOnly: false})
    }

}


module.exports = createDocker