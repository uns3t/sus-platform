const user = require("../db/model/userdb")
const challenge=require("../db/model/challengedb")
// const log = require("../db/model/logdb")

const scoreboard = async (ctx) => {

    //不需要登录验证，所有人都可以看得分板

    // 这样子就只查这几个字段出来了
    let users = await user.find({}, {username: undefined, solved:[], ecard: 0})
    let tots = await user.count()
    let chas = await challenge.find()

    // 给用户算总分，排序(超级性能瓶颈)
    for (let user of users) {
        user.userscore = 0
        user.pwn = 0
        user.web = 0
        user.reverse = 0
        user.crypto = 0
        user.misc = 0
        // 应该用上面那种查询方法就能default了？
        //if (user.solved === undefined) user.solved = []
        for (let cha of chas) {
            if ((user.solved).includes(cha.name)) {
                user.userscore += cha.score
                user[cha.type] += cha.score
            }
        }
    }

    let compare = (obj1, obj2) => {
        var val1 = obj1.userscore;
        var val2 = obj2.userscore;
        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else if (val1 === val2) {
            if (obj1.time > obj2.time) {
                return 1;
            } else if (obj1.time < obj2.time) {
                return -1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }
    users.sort(compare)

    // 研本一卡通正则
    var reg = new RegExp(/.{3}20.{4}/)
    var regy = new RegExp(/21320.{4}/)
    var regx = new RegExp(/213.{6}/)
    let res = []
    let res20A = []
    let tot20A = 0
    let res20B = []
    let tot20B = 0

    for (let from = 0; from < tots; ++from) {
        let tempuser = users[from]
        let result = {
            username: tempuser.username,
            userscore: tempuser.userscore,
            pwn: tempuser.pwn,
            web: tempuser.web,
            reverse: tempuser.reverse,
            misc: tempuser.misc,
            crypto: tempuser.crypto,
            index: from + 1,
        }
        if (regx.test(tempuser.ecard)) {
            result.grade = "本科生"
            res.push(result)
        } else {
            result.grade = "研究生"
            res.push(result)
        }

        if (reg.test(tempuser.ecard)) {
            if (regy.test(tempuser.ecard)) {
                tot20A++
                result.grade = "本科"
                res20A.push(result)
            } else {
                tot20B++
                result.grade = "研究生"
                res20B.push(result)
            }
        }
    }

    ctx.body = {
        theTwentyA: res20A,
        theTwentyTotA: tot20A,
        theTwentyB: res20B,
        theTwentyTotB: tot20B,
        theRet: res,
        theTot: tots,
    }
}

module.exports = scoreboard
