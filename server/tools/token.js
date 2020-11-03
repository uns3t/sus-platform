const jwt=require("jwt-simple")
let secret="as32hf8h-57j203-dfnrg-0w9391jeo13"
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7
// const tokenExpiresTime = 1000*20



function maketoken(info){
    info.expires=Date.now()+tokenExpiresTime
    return jwt.encode(info,secret)
}

function decodetoken(token) {
    return jwt.decode(token,secret)
}

module.exports={
    jwtencode:maketoken,
    jwtdecode:decodetoken
}


