const challenge = require("../db/model/challengedb")
const user = require("../db/model/userdb")
const verify = require("../tools/verify")

// 获取单个用户解出来的题(postchallenge这个名字起得并不是很好。。。。)
const postchallenge = async (ctx) => {

    if (!verify.user_login(ctx)) {
        return
    }
    // const start_time = "2020-10-17 10:00:00"
    // if(ctx.state.tokencode !== 1 && Date.now() < new Date(start_time).getTime())
    // {
    //     ctx.body = {
    //         msg: "比赛尚未开始"
    //     }
    //     return
    // }

    let challenges = await challenge.find()
    let retcha = challenges.map((v) => {
        v.flag = undefined
        return v
    })
    // 直接从用户数据库查找用户解出来了哪些题
    let usercha = await user.find({username: ctx.state.userinfo.username}).solved
    let ret = {}
    for (let val1 of retcha) {
        ret[val1.type] = []
    }

    for (let val1 of retcha) {
        let solved = false
        for (let val2 of usercha) {
            if (val1.challengename === val2) {
                solved = true
            }
        }
        ret[val1.type].push({
            value: val1,
            solved: solved
        })
    }

    // console.log(ret)

    ctx.body = {
        challenge: ret
    }


    //需要在log中获取该用户已解答的题目
}

module.exports = postchallenge
