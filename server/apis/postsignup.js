const user=require("../db/model/userdb")

const signup=async(ctx)=>{
    let body=ctx.request.body
    let tempuser=new user({
        username:body.usrname,
        pwd:body.pwd,
        studentid:body.studentid,
        phone:body.phone,
        name:body.name,
        qq:body.qq,
    })

    try{
        await tempuser.save()
    }catch (e) {
        console.log(e)
    }


}

module.exports=signup
