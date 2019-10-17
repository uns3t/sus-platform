const challenge=require("../db/model/challengedb")
const log=require("../db/model/logdb")


const getchallenge=async(ctx)=>{
    let challenges=await challenge.find()

    ctx.body=challenges


    //需要在log中获取该用户已解答的题目
}

module.exports=getchallenge
