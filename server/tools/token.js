const jwt=require("jwt-simple")
let secret="uns3t"
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7



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


