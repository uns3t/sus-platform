const Docker = require("dockerode")
const getPort = require("get-port")
const verify = require("../tools/verify")
const format = require("../tools/format")
const challengeInfo = require("../tools/challengeInfo")


const reqformat = {
    challengename: String,
}

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
    for (let v in body) {
        body[v] = body[v].replace(/\s*/g, "");        //过滤空格
    }
    let cha = challengeInfo.getInfo(body.challengename)
    let tempuser = await user.findOne({username: ctx.state.userinfo.username})

    if (cha === undefined || !cha.isDynamic) {
        ctx.body = {
            msg: "题目不存在或不能动态启动docker"
        }
    } else if (tempuser.dockerTimeout !== null) {
        ctx.body = {
            msg: "一个用户同一时间只能创建一个容器"
        }
    } else {
        // 获取1-2w之间的一个端口
        let port = await getPort({port: getPort.makeRange(10000, 20000)})

        // 目前的想法应该是build通用的image，用image起container的时候要动态绑定端口，起来之后再execflag下发脚本修改flag

        let docker = new Docker()
        let auxContainer;
        let opt = {
            Image: cha.imageName,  /*用哪个镜像*/
            name: tempuser.token,
            ExposedPorts: {},
            HostConfig: {PortBindings: {}},
            Cmd: [""],             // 动态下发flag脚本
            Env: ["flag="+cha.flag]
        }
        opt.ExposedPorts[cha.port.toString()+"/tcp"] = {}
        opt.HostConfig.PortBindings[cha.port.toString() + "/tcp"] = [{"HostPort": port.toString()}]
        docker.createContainer(opt).then(function (container) {
            auxContainer = container
            return auxContainer.start()
        }).then(function (data) {
            console.log("container " + tempuser.token + " started")

            // 创建一个定时任务，并把定时任务id存进数据库
            let timeoutID = setTimeout(function () {
                auxContainer.stop()
                auxContainer.remove()
                user.findOneAndUpdate({username: tempuser.username}, {dockerTimeout: null})
            }, 7200 * 1000)   // 2h
            user.findOneAndUpdate({username: tempuser.username}, {dockerTimeout: timeoutID})
        }).catch(function (error) {
            console.log(error)
        })
    }
}


module.exports = createDocker