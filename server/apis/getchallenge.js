const challenge=require("../db/model/challengedb")
const log=require("../db/model/logdb")


const getchallenge=async(ctx)=>{
    let challenges=await challenge.find()

    let compare=(obj1,obj2)=>{
        var val1 = obj1.tpye;
        var val2 = obj2.tpye;
        if (val1 < val2) {
            return 1;
        } else if (val1 > val2) {
            return -1;
        } else {
            return 0;
        }
    }

    challenges.sort(compare)

    ctx.body=challenges


    //需要在log中获取该用户已解答的题目
}

module.exports=getchallenge
