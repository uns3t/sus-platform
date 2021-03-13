const jwt=require("jwt-simple")
import { v4 as uuidv4 } from 'uuid';

let secret=uuidv4();

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


