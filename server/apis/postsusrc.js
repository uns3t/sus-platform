const src = require("../db/model/susrcdb")
const format = require("../tools/format")
const verify = require("../tools/verify")

const reqformat = {
    type: String,
    description: String
}

// 前端貌似做了转义，无XSS
const postsusrc = async (ctx) => {

    if (!verify.user_login(ctx)) {
        return
    }
    let body = ctx.request.body
    if (!format(reqformat, body.susrcform)) {
        ctx.body = {
            msg: "数据验证未通过"
        }
        return
    }
    if(body.type === ''|| body.description === '')
    {
        ctx.body = {
            msg: "信息不能为空"
        }
        return
    }
    Date.prototype.Format = function (fmt) {
        let o = {
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
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
            }
        }
        return fmt;
    };

    let srctemp = new src({
        type: body.type,
        description: body.description,
        time: new Date().Format("yyyy/MM/dd HH:mm:ss")
    })
    try {
        await srctemp.save()
        ctx.body = {
            code: 0
        }
    } catch (e) {
        console.log(e)
    }


}

module.exports = postsusrc
