const user = require("../db/model/userdb")
const challenge = require("../db/model/challengedb")
const log = require("../db/model/logdb")
const py = require("../db/model/pydb")
const verify = require("../tools/verify")
const format = require("../tools/format")
const md5 = require("md5-node")

const reqformat = {
    challengename: String,
    flag: String
}

// 题目解出来时的一系列操作
// 动态flag的格式，js居然没有format函数，用$占位replace替换
let flagFormat = "SUSCTF{$}"


// 动态分数算法实现
const submitflag = async (ctx) => {
    // const end = "2020-10-19 22:00:00"
    // let t1 = new Date(end).getTime()
    // if(Date.now() > t1)
    // {
    //     ctx.body = {
    //         msg: "比赛已结束"
    //     }
    //     return
    // }
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
        if(v === "challengename") { // 允许题目名有空格
            continue
        }
        body[v] = body[v].replace(/\s*/g, "");        //过滤空格
    }

    if(body.flag === '')
    {
        ctx.body = {
            msg: "flag不可以为空"
        }
        return
    }

    // 放到前面不怕条件竞争，增加一点点性能消耗
    let cha = await challenge.findOne({challengename: body.challengename})
    let tempuser = await user.findOne({username: ctx.state.userinfo.username})

    let chalog = await log.find({
        username: ctx.state.userinfo.username,
        challengename: body.challengename,
        issolved: true
    })
    if (chalog.length > 0) {
        ctx.body = {
            msg: "您已提交过此题"
        }
    } else {
        // 动态分数算法
        let present_score = parseInt(Math.round(cha.originscore / (1 + Math.max(0, cha.solved) / 11.92201 ** 1.206096)))

        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "H+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "S+": this.getMilliseconds()
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (let k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
                }
            }
            return fmt;
        };

        // 动态flag判断
        if ((cha.isDynamic && body.flag === flagFormat.replace("$",md5(cha.flag + tempuser.token)))
            || (!cha.isDynamic && cha.flag === body.flag)) {


            let templog = new log({
                username: ctx.state.userinfo.username,
                challengename: body.challengename,
                submittime: new Date().Format("yyyy/MM/dd HH:mm:ss"),
                type: cha.type,
                // solvedscore: present_score,
                issolved: true,
                flag: body.flag
            })
            await templog.save()

            // 添加已经做出来的题进入数组
            tempuser.solved.push(cha.challengename)
            await user.findOneAndUpdate({username: ctx.state.userinfo.username},{solved: tempuser.solved, time: new Date()}) //..... 这里也是
            // 更新题目分数
            await challenge.findOneAndUpdate({challengename:cha.challengename},{
                solved: cha.solved + 1,
                submit: cha.submit + 1,
                score: present_score})
            ctx.body = {
                code: 0
            }
        } else {
            if(cha.isDynamic)   // 动态flag判断
            {
                let pylog = log.find({flag: body.flag, issolved: true})
                if(pylog.length > 0)   // 存在py
                {
                    let pyinfo = new py({
                        pyer: ctx.state.userinfo.username,
                        pyee: py.username,
                        pychaname: body.challengename,
                        pyflag: body.flag
                    })
                    await pyinfo.save()
                }
            }
            let templog = new log({
                username: ctx.state.userinfo.username,
                challengename: body.challengename,
                submittime: new Date().Format("yyyy/MM/dd HH:mm:ss"),
                type: cha.type,
                // solvedscore: previous_score,
                issolved: false,
                flag: body.flag
            })
            await templog.save()
            await challenge.findOneAndUpdate({challengename:cha.challengename},{submit: cha.submit + 1})
            ctx.body = {
                msg: "flag错误"
            }
        }
    }
}

module.exports = submitflag
