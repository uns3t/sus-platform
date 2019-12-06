const user=require("../db/model/userdb")
const challenge=require("../db/model/challengedb")
const log=require("../db/model/logdb")
const format=require("../tools/format")

const reqformat={
    challengename:String,
    flag:String
}

const submitflag=async(ctx)=>{
    if(ctx.state.tokencode==-1){

        ctx.body={
            msg:"401"
        }
        return
    }
    if(ctx.state.userinfo.expires<Date.now()){
        ctx.body={
            msg:"登陆Token过期，请重新登陆"
        }
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

    console.log("---------------")
    console.log(body)
    let chalog=await log.find({username:ctx.state.userinfo.username,challengename:body.challengename,issolved:true})
    console.log(chalog)
    if(chalog.length>0){
        ctx.body={
            msg:"您已提交过此题"
        }
    }else {
        let cha=await challenge.findOne({challengename:body.challengename})


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
        if(cha.flag==body.flag){
            let templog=new log({
                username:ctx.state.userinfo.username,
                challengename:body.challengename,
                submittime: new Date().Format("yyyy/MM/dd HH:mm:ss"),
                type: cha.type,
                solvedscore: cha.score,
                issolved:true,
                flag:body.flag
            })
            await templog.save()
            let tempuser=await user.findOne({username: ctx.state.userinfo.username})
            tempuser.userscore+=cha.score
            console.log(cha.solved)
            await user.where({username: ctx.state.userinfo.username}).update({userscore:tempuser.userscore,time:new Date()})
            await challenge.where({challengename:cha.challengename}).update({solved: cha.solved+1,submit:cha.submit+1})
            ctx.body={
                code:0
            }
        }else {
            let templog=new log({
                username:ctx.state.userinfo.username,
                challengename:body.challengename,
                submittime: new Date().Format("yyyy/MM/dd HH:mm:ss"),
                type: cha.type,
                solvedscore: cha.score,
                issolved:false,
                flag:body.flag
            })
            await templog.save()
            let submitnum=cha.submit+1
            await challenge.where({challengename:cha.challengename}).update({submit:submitnum})
            ctx.body={
                msg:"flag错误"
            }
        }
    }
}

module.exports=submitflag
