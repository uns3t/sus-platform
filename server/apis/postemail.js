const user = require("../db/model/userdb")
const md5 = require('md5-node')
const nodemailer = require('nodemailer')
const format = require("../tools/format")
const reqformat = {
    email: String
}

const transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: 'susctf2020@qq.com',
        pass: 'rdxlmskfsuqieabf'
    }
});

const send = (mailOptions) => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
    });
}

const emailpass = async (ctx) => {
    let body = ctx.request.body
    if (!format(reqformat, body)) {
        ctx.body = {
            msg: "数据验证未通过"
        }
        return
    }
    if (body.email === "") {
        ctx.body = {
            msg: "email不能为空"
        }
        return
    }
    let check = await user.find({email: body.email})
    if (check.length === 0) {
        ctx.body = {msg: "邮箱不存在"}
        return
    }
    let time = Date.now() + 600 * 1000 // 10 minutes
    const key = 's34m'
    let emailCode = md5(key + body.email + time.toString())
    emailCode = emailCode.substr(emailCode.length - 7, 7)
    await user.where({email: body.email})
        .update({verification: emailCode, expiration: time})
    let email = {
        title: 'SUS2020虎踞龙蟠杯--邮箱验证码',
        htmlBody: '<table style="background: #f3f3f3; min-width: 350px; font-size: 1px; line-height: normal;"width="100%"cellspacing="0"cellpadding="0"border="0"><tbody><tr><td valign="top"align="center"><table class="table750"style="width: 100%; max-width: 750px; min-width: 350px; background: #f3f3f3;"width="750"cellspacing="0"cellpadding="0"border="0"><tbody><tr><td class="mob_pad"style="width: 25px; max-width: 25px; min-width: 25px;"width="25">&nbsp;</td><td style="background: #ffffff;"valign="top"align="center"><table style="width: 100% !important; min-width: 100%; max-width: 100%; background: #f3f3f3;"width="100%"cellspacing="0"cellpadding="0"border="0"><tbody><tr><td valign="top"align="right"><div class="top_pad"style="height: 25px; line-height: 25px; font-size: 23px;">&nbsp;</div></td></tr></tbody></table><table style="width: 88% !important; min-width: 88%; max-width: 88%;"width="88%"cellspacing="0"cellpadding="0"border="0"><tbody><tr><td valign="top"align="left"><div style="height: 39px; line-height: 39px; font-size: 37px;">&nbsp;</div><font class="mob_title1"style="font-size: 52px; line-height: 55px; font-weight: 300; letter-spacing: -1.5px;"face="Source Sans Pro, sans-serif"color="#1a1a1a"><a href="http://146.56.223.95/"style="text-decoration:none"rel="noopener"target="_blank"><span class="mob_title1"style="font-family: Nunito, Arial, Tahoma, Geneva, sans-serif; color: #6777ef; font-size: 48px; line-height: 55px; font-weight: 700; letter-spacing: -1.5px;">第一届“虎踞龙蟠杯”</span></a></font><div style="height: 73px; line-height: 73px; font-size: 71px;">&nbsp;</div></td></tr></tbody></table><table style="width: 88% !important; min-width: 88%; max-width: 88%;"width="88%"cellspacing="0"cellpadding="0"border="0"><tbody><tr><td valign="top"align="left"><font style="font-size: 52px; line-height: 60px; font-weight: 300; letter-spacing: -1.5px;"face="Nunito, sans-serif"color="#1a1a1a"><span style="font-family: Nunito, Arial, Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 52px; line-height: 60px; font-weight: 300; letter-spacing: -1.5px;">邮箱验证码</span></font><div style="height: 33px; line-height: 33px; font-size: 31px;">&nbsp;</div><font style="font-size: 24px; line-height: 32px;"face="Nunito, sans-serif"color="#585858"><span style="font-family: Nunito, Arial, Tahoma, Geneva, sans-serif; color: #585858; font-size: 24px; line-height: 32px;">您好，您的邮箱验证码是:</span><span style="font-family: Nunito, Arial, Tahoma, Geneva, sans-serif; color: #585858; font-size: 24px; line-height: 32px;">' + emailCode + '</span></font><div style="height: 75px; line-height: 75px; font-size: 73px;">&nbsp;</div></td></tr></tbody></table><table style="width: 100% !important; min-width: 100%; max-width: 100%; background: #f3f3f3;"width="100%"cellspacing="0"cellpadding="0"border="0"><tbody><tr><td valign="top"align="center"><div style="height: 34px; line-height: 34px; font-size: 32px;">&nbsp;</div><table style="width: 88% !important; min-width: 88%; max-width: 88%;"width="88%"cellspacing="0"cellpadding="0"border="0"><tbody><tr><td valign="top"align="center"><div style="height:12px; line-height: 34px; font-size: 32px;">&nbsp;</div><font style="font-size: 17px; line-height: 20px;"face="Nunito, sans-serif"color="#868686"><span style="font-family: Nunito, Arial, Tahoma, Geneva, sans-serif; color: #868686; font-size: 17px; line-height: 20px;">2005-2020©SUS.All Rights Reserved.</span></font><div style="height: 3px; line-height: 3px; font-size: 1px;">&nbsp;</div><font style="font-size: 17px; line-height: 20px;"face="Nunito, sans-serif"color="#1a1a1a"><span style="font-family: Nunito, Arial, Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 17px; line-height: 20px;"><a href="http://146.56.223.95/"target="_blank"style="font-family: Nunito, Arial, Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 17px; line-height: 20px; text-decoration: none;"rel="noopener">访问官网</a>&nbsp;|&nbsp;<a href="mailto:sus2020@cyberspacesecurity.online"target="_blank"style="font-family: Nunito, Arial, Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 17px; line-height: 20px; text-decoration: none;"rel="noopener">联系我们</a></span></font><div style="height: 35px; line-height: 35px; font-size: 33px;">&nbsp;</div></td></tr></tbody></table></td></tr></tbody></table></td><td class="mob_pad"style="width: 25px; max-width: 25px; min-width: 25px;"width="25">&nbsp;</td></tr></tbody></table></td></tr></tbody></table>'
    }
    let mailOptions = {
        from: 'SUS<susctf2020@qq.com>',
        to: body.email,
        subject: email.title,
        html: email.htmlBody
    }
    try {
        await send(mailOptions)
        ctx.body = {
            code: 0
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = emailpass
