const challenge = require("../db/model/challengedb")
const verify = require("../tools/verify")
const format = require("../tools/format")

const reqformat = {
    challengename: String,
    description: String,
    type: String,
    flag: String,
    score: String,
    isDynamic: Boolean,
    hasDocker: Boolean
}

const dockerFormat = {
    imageName: String,
    port: Number
}

const addchallenge = async (ctx) => {

    if (!verify.admin_login(ctx)) {
        return
    }

    let body = ctx.request.body

    // challenge系列不需要过滤空格，描述题目名什么的都允许空格
    if(!format(reqformat,body)){
        ctx.body={
            msg:"数据验证未通过"
        }
        return
    }
    if(body.hasDocker) {    // 对存在docker的数据进行进一步校验
        if (!format(dockerFormat, body)) {
            ctx.body = {
                msg: "数据验证未通过"
            }
            return
        }
    }

    // 相信管理员不要操作失误了。。。。
    // for(let v in body){
    //     if(body[v]==''){
    //         ctx.body={
    //             msg:"数据不能为空"
    //         }
    //         return
    //     }
    // }

    let check = await challenge.find({challengename: body.challengename})
    if (check.length > 0) {
        ctx.body = {
            msg: "题目名重复请重新添加"
        }
    } else {
        let tempchallenge = {
            challengename: body.challengename,
            flag: body.flag,
            score: body.score,
            originscore: body.score,
            type: body.type,
            description: body.description,
            isDynamic: body.isDynamic,
            hasDocker: body.hasDocker,
            imageName: body.imageName,
            port: body.port
        }
        try {
            // upsert在没有时插入有时更新，防止条件竞争
            await challenge.updateOne({challengename: body.challengename}, tempchallenge, {upsert: true})
            ctx.body = {
                code: 0
            }
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = addchallenge