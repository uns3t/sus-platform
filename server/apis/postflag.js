/*
动态积分实现
 */

const user=require("../db/model/userdb")
const challenge=require("../db/model/challengedb")
const log=require("../db/model/logdb")
const verify=require("../tools/verify")
const format=require("../tools/format")

const reqformat={
    challengename:String,
    flag:String
}


const submitflag=async(ctx)=>{
    const end = "2020-10-19 22:00:00"
    let t1 = new Date(end).getTime()
    if(Date.now() > t1)
    {
        ctx.body = {
            msg: "比赛已结束"
        }
        return
    }
    if(!verify.user_login(ctx))
    {
        return
    }
    let body=ctx.request.body

    if(!format(reqformat,body)){
        ctx.body={
            msg:"数据验证不通过"
        }
        return
    }
    for(let v in body){
        body[v]=body[v].replace(/\s*/g,"");        //过滤空格
    }

    // console.log("---------------")
    // console.log(body)
    let chalog=await log.find({username:ctx.state.userinfo.username,challengename:body.challengename,issolved:true})
    // console.log(chalog)
    if(chalog.length>0){
        ctx.body={
            msg:"您已提交过此题"
        }
    }else {
        let cha=await challenge.findOne({challengename:body.challengename})

        // let previous_score = cha.originscore
        // if(cha.solved)  //已经有解了
        // {
        let previous_score = parseInt(Math.round(cha.originscore/(1+Math.max(0, cha.solved-1)/11.92201**1.206096)))
            // previous_score = parseInt(Math.pow(0.9, cha.solved-1) * cha.originscore)
            // 防止分数变成0
            // if(previous_score < 1)
            // {
            //     previous_score = 1
            // }
        // }
        // let present_score = parseInt(Math.pow(0.9, cha.solved) * cha.originscore)
        // if(present_score < 1)
        // {
        //     present_score = 1
        // }
        let present_score = parseInt(Math.round(cha.originscore/(1+Math.max(0, cha.solved)/11.92201**1.206096)))

        Date.prototype.Format = function(fmt){
            var o = {
                "M+": this.getMonth()+1,
                "d+": this.getDate(),
                "H+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "S+": this.getMilliseconds()
            };
            if(/(y+)/.test(fmt)){
                fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
            }
            for(var k in o){
                if (new RegExp("(" + k +")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
                }
            }
            return fmt;
        };
        if(cha.flag===body.flag){
            await log.updateMany({challengename:body.challengename}, {solvedscore:present_score})
            let templog=new log({
                username:ctx.state.userinfo.username,
                challengename:body.challengename,
                submittime: new Date().Format("yyyy/MM/dd HH:mm:ss"),
                type: cha.type,
                solvedscore: present_score,
                issolved:true,
                flag:body.flag
            })
            await templog.save()
            let tempuser=await user.findOne({username: ctx.state.userinfo.username})

            tempuser.userscore+=present_score
            // console.log(cha.solved)
            await user.updateOne({username: ctx.state.userinfo.username}, {userscore:tempuser.userscore,time:new Date()})

            // 愚蠢的动态积分更新
            let solved = await log.find({challengename:body.challengename,issolved:true})
            for(let i=0;i<solved.length;i++)
            {
                if(solved[i].username!==ctx.state.userinfo.username)
                {
                    let temp_user = await user.findOne({username: solved[i].username})
                    // console.log(temp_user)
                    await user.updateOne({username: solved[i].username},{userscore:temp_user.userscore-previous_score+present_score})
                }
            }

            await challenge.updateOne({challengename:cha.challengename}, {solved: cha.solved+1,submit:cha.submit+1, score:present_score})
            ctx.body={
                code:0
            }
        }else {
            let templog=new log({
                username:ctx.state.userinfo.username,
                challengename:body.challengename,
                submittime: new Date().Format("yyyy/MM/dd HH:mm:ss"),
                type: cha.type,
                solvedscore: previous_score,
                issolved:false,
                flag:body.flag
            })
            await templog.save()
            await challenge.updateOne({challengename:cha.challengename}, {submit:cha.submit+1})
            ctx.body={
                msg:"flag错误"
            }
        }
    }
}

module.exports=submitflag
