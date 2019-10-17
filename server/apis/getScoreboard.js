const user=require("../db/model/userdb")

const scoreboard=async(ctx)=>{
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

    ctx.body=users
}

module.exports=scoreboard
