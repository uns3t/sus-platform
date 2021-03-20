const log = require("../db/model/logdb")
const user = require("../db/model/userdb")
const challenge = require("../db/model/challengedb")
const verify = require("../tools/verify")
const format = require("../tools/format")

const reqformat = {
    username: String,
}


const userscore = async (ctx) => {
    if (!verify.user_login(ctx)) {
        return
    }

    let body

    if (Object.keys(ctx.request.body).length !== 0) {
        format(reqformat, ctx.request.body)
        body = ctx.request.body
    } else {

        body = ctx.state.userinfo

    }
    // console.log(body)
    let forechart = {
        pwn: [0, 0],
        reverse: [0, 0],
        web: [0, 0],
        misc: [0, 0],
        crypto: [0, 0],
    }
    let users = await user.find()
    let chas = await challenge.find()


    // 此处进行用户分数排名，需要临时计算全用户分数(感觉是计算量最大的地方)
    for (let tmpuser of users) {
        tmpuser.userscore = 0
        if (tmpuser.solved === undefined) tmpuser.solved = []
        for (let cha of chas) {
            if ((tmpuser.solved).includes(cha.challengename)) {
                tmpuser.userscore += cha.score
            }
        }
    }

    let compare = (obj1, obj2) => {
        let val1 = obj1.userscore;
        let val2 = obj2.userscore;
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

    // TODO 有没有更好的方式？
    let index = 0
    for (let temp of users) {
        index++
        if (temp.username === body.username) {
            break
        }
    }

    // 考虑没做出题的情况
    let solvedCha = users[index - 1].solved;
    if (solvedCha === undefined) solvedCha = []

    // 做出来该方向题的分数和该方向题总分，画五边形战士
    for (let cha of chas) {
        if (solvedCha.includes(cha.name)) {
            forechart[cha.type][0] += cha.score
        }
    }
    for (let temp of chas) {
        forechart[temp.type][1] += temp.score
    }


    let templog = await log.find({username: body.username})

    let newrelog = []
    templog.map((v, i, e) => {
        if (v.issolved) {
            newrelog.push({
                username: v.username, challengename: v.challengename, submittime: v.submittime,
                type: v.type, issolved: "yes"
            })
        } else {
            newrelog.push({
                username: v.username, challengename: v.challengename, submittime: v.submittime,
                type: v.type, issolved: "no"
            })
        }
    })

    // console.log(forechart)
    // console.log(ret)
    ctx.body = {
        rank: index,
        echartdata: forechart,
        challengelog: newrelog
    }
}

module.exports = userscore
