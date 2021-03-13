const user = require("../db/model/userdb")
const challengeInfo = require("../tools/challengeInfo")
// const log = require("../db/model/logdb")

const scoreboard = async (ctx) => {

    //不需要登录验证，所有人都可以看得分板

    let users = await user.find()
    let tots = await user.count()

    // 为什么超级报错？
    for (let tmpuser in users) {
        tmpuser.userscore = 0
        for (let cha in tmpuser.solved) {
            tmpuser.userscore += challengeInfo.getInfo(cha).score
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
    let ret = users.map((v) => {
        v.pwd = undefined
        v.studentid = undefined
        v.email = undefined
        v.qq = undefined
        v.phone = undefined
        v.name = undefined
        v.time = undefined
        return v
    })

    // 研本一卡通正则
    var reg = new RegExp(/.{3}20.{4}/)
    var regy = new RegExp(/21320.{4}/)
    var regx = new RegExp(/213.{6}/)
    let res = []
    let res20A = []
    let tot20A = 0
    let res20B = []
    let tot20B = 0

    // 遍历排序过的全部用户，计算各方向分数
    for (let from = 0; from < tots; ++from) {
        let foreach = {
            pwn: 0,
            reserve: 0,
            web: 0,
            misc: 0,
            crypto: 0,
        }
        let tempuser = await user.find({username: ret[from].username})
        // 从challenge缓存里面拿数据
        for (let chaName of tempuser.solved) {
            let tmpChallenge = challengeInfo.getInfo(chaName)
            foreach[tmpChallenge.type] += tmpChallenge.score
        }
        if (regx.test(ret[from].ecard)) {
            res.push({
                username: ret[from].username,
                userscore: ret[from].userscore,
                pwn: foreach['pwn'],
                web: foreach['web'],
                reserve: foreach['reserve'],
                misc: foreach['misc'],
                crypto: foreach['crypto'],
                index: from + 1,
                grade: "本科生"
            })
        } else {
            res.push({
                username: ret[from].username,
                userscore: ret[from].userscore,
                pwn: foreach['pwn'],
                web: foreach['web'],
                reserve: foreach['reserve'],
                misc: foreach['misc'],
                crypto: foreach['crypto'],
                index: from + 1,
                grade: "研究生"
            })
        }


        if (reg.test(ret[from].ecard)) {
            if (regy.test(ret[from].ecard)) {
                tot20A++
                res20A.push({
                    username: ret[from].username,
                    userscore: ret[from].userscore,
                    pwn: foreach['pwn'],
                    web: foreach['web'],
                    reserve: foreach['reserve'],
                    misc: foreach['misc'],
                    crypto: foreach['crypto'],
                    index: from + 1,
                    grade: "本科"
                })
            } else {
                tot20B++
                res20B.push({
                    username: ret[from].username,
                    userscore: ret[from].userscore,
                    pwn: foreach['pwn'],
                    web: foreach['web'],
                    reserve: foreach['reserve'],
                    misc: foreach['misc'],
                    crypto: foreach['crypto'],
                    index: from + 1,
                    grade: "研究生"
                })
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
