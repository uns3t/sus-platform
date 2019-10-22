const user=require("../db/model/userdb")
// const format=require("../tools/format")

// const reqformat={
//     username:String,
//     pwd:String,
//     studentid:String,
//     phone:String,
//     name:String,
//     qq:String,
//     email:String
//
// }

const signup=async(ctx)=>{

    let body=ctx.request.body

    // if(!format(reqformat,body)){
    //     ctx.body={
    //         msg:"数据验证未通过"
    //     }
    //     return
    // }
    //数据验证后期再加，有些繁琐

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
