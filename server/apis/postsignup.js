const user=require("../db/model/userdb")
const format=require("../tools/format")

const reqformat={
    username:String,
    pwd:String,
    pwdconfirm:String,
    email:String,
    studentid:String,
    phone:String,
    name:String,
    qq:String,
}

const signup=async(ctx)=>{

    let body=ctx.request.body

    if(!format(reqformat,body.signupform)){
        ctx.body={
            msg:"数据验证未通过"
        }
        return
    }
    if(body.isnotSeu){
        if(body.signupform.username==''||body.signupform.pwd==''||body.signupform.pwdconfirm==''||body.signupform.email==''){
            ctx.body={
                msg:"您的注册数据不能为空"
            }
            return
        }

    }else {
        for (let v in body.signupform){
            if(body.signupform[v]==""){
                ctx.body={
                    msg:"注册数据不能为空"
                }
                return
            }
        }
    }
    for(let v in body.signupform){
        body.signupform[v]=body.signupform[v].replace(/\s*/g,"");
    }

    //数据验证后期再加，有些繁琐
    if(body.signupform.pwd!=body.signupform.pwdconfirm){
        ctx.body={msg:"两次密码不相同"}
        return
    }
    console.log(body)
    let check= await user.find({username: body.signupform.username})
    if(check.length>0){
        ctx.body={msg:"用户名已注册"}
        return
    }else {
        let tempuser=new user({
            username:body.signupform.username,
            pwd:body.signupform.pwd,      //注意后面加上md5
            studentid:body.signupform.studentid,
            phone:body.signupform.phone,
            name:body.signupform.name,
            qq:body.signupform.qq,
            email:body.signupform.email
        })

        try{
            await tempuser.save()
            ctx.body={
                code:0
            }
        }catch (e) {
            console.log(e)
        }
    }



}

module.exports=signup
