const jwt=require("jwt-simple")
// const { v4: uuidv4 } = require('uuid');

// 记得改
let secret="1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";

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


