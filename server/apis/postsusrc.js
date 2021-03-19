const src=require("../db/model/susrcdb")
const format=require("../tools/format")
const verify=require("../tools/verify")

const reqformat={
    type:String,
    description:String
}

const postsusrc=async(ctx)=>{

    if(!verify.user_login(ctx))
    {
        return
    }
    let body=ctx.request.body
    if(!format(reqformat,body.susrcform)){
        ctx.body={
            msg:"数据验证未通过"
        }
        return
    }
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
        for(let k of o){
            if (new RegExp("(" + k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
            }
        }
        return fmt;
    };

    let srctemp=new src({
        type: body.type,
        description: body.description,
        time:new Date().Format("yyyy/MM/dd HH:mm:ss")
    })
    try{
        await srctemp.save()
        ctx.body={
            code:0
        }
    }catch (e) {
        console.log(e)
    }


}

module.exports=postsusrc
