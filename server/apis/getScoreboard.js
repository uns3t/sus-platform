const user=require("../db/model/userdb")

const scoreboard=async(ctx)=>{
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
    let users=await user.find()
    let compare=(obj1,obj2)=>{
        var val1 = obj1.userscore;
        var val2 = obj2.userscore;
        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }
    }
    users.sort(compare)
    let ret=users.map((v)=>{
        v.pwd=undefined
        v.studentid=undefined
        v.qq=undefined
        v.phone=undefined
        v.name=undefined
        return v
    })

    ctx.body=ret
}

module.exports=scoreboard