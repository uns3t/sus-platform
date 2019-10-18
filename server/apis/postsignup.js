const user=require("../db/model/userdb")

const signup=async(ctx)=>{
    let body=ctx.request.body
    console.log(body)
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

module.exports=signup
