const Router = require('koa-router')
// Admin路由
const addchallenge = require('./apis/adminaddchallenge')
const deletechallenge = require('./apis/admindeletechallenge')
const editchallenge = require('./apis/admineditchallenge')
const getalluser = require('./apis/admingetalluser')
const getdockers = require("./apis/admingetdockers")
const getsrc = require('./apis/admingetsrc')

// get
const getrefreshdocker = require("./apis/getrefreshdocker")
const getnotice = require('./apis/getnotice')
const getscoreboard = require('./apis/getScoreboard')
const getuserlog = require('./apis/getuserlog')
const getlogout = require('./apis/getlogout')

// post
const postedituser = require('./apis/postedituser')
const postlogin = require('./apis/postlogin')
const postsignup = require('./apis/postsignup')
const postuserscore = require('./apis/postuserscore')
const postchallenge = require('./apis/postchallenge')
const postsusrc = require('./apis/postsusrc')
const postpasschange = require('./apis/postpasschange')
const postemail = require('./apis/postemail')
const poststopdocker = require("./apis/poststopdocker")
const postcreatedocker = require("./apis/postcreatedocker")
const postquerydocker = require("./apis/postquerydocker")
const postflag = require('./apis/postflag')

const router = new Router({
    prefix: '/api'
})

router.post("/postflag", postflag)
router.post("/addchallenge", addchallenge)
router.post("/deletechallenge", deletechallenge)
router.post("/postedituser", postedituser)
router.post("/postlogin", postlogin)
router.post("/postsignup", postsignup)
router.post("/postchallenge", postchallenge)
router.post("/editchallenge", editchallenge)
router.post("/postuserscore", postuserscore)
router.post("/postsusrc", postsusrc)
router.post("/postemail", postemail)
router.post("/postpasschange", postpasschange)
router.post("/postcreatedocker", postcreatedocker)
router.post("/postquerydocker", postquerydocker)
router.post("/poststopdocker", poststopdocker)
router.post("/")

router.get("/getalluser", getalluser)
router.get("/getnotice", getnotice)
router.get("/getscoreboard", getscoreboard)
router.get("/getuserlog", getuserlog)
router.get("/getlogout", getlogout)
router.get("/admingetsrc", getsrc)
router.get("/getrefreshdocker", getrefreshdocker)
router.get("/getdockers", getdockers)

module.exports = router













