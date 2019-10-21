const user=require("../db/model/userdb")

const signup=async(ctx)=>{

    let body=ctx.request.body
    console.log(body)
    let check= await user.find({username: body.username})
    if(check.length>0){
        ctx.body={msg:"用户名已注册"}
    }else {
        let tempuser=new user({
            username:body.username,
            pwd:body.pwd,      //注意后面加上md5
            studentid:body.studentid,
            phone:body.phone,
            name:body.name,
            qq:body.qq,
            email:body.email
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
