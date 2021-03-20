const Router = require('koa-router')
const postflag = require('./apis/postflag')
const addchallenge = require('./apis/adminaddchallenge')
const deletechallenge = require('./apis/admindeletechallenge')
const editchallenge = require('./apis/admineditchallenge')
const getalluser = require('./apis/admingetalluser')
const getnotice = require('./apis/getnotice')
const getscoreboard = require('./apis/getScoreboard')
const getuserlog = require('./apis/getuserlog')
const postedituser = require('./apis/postedituser')
const postlogin = require('./apis/postlogin')
const postsignup = require('./apis/postsignup')
const getlogout = require('./apis/getlogout')
const postuserscore = require('./apis/postuserscore')
const postchallenge = require('./apis/postchallenge')
const postsusrc = require('./apis/postsusrc')
const admingetsrc = require('./apis/admingetsrc')
const postpasschange = require('./apis/postpasschange')
const postemail = require('./apis/postemail')
const getrefreshdocker = require("./apis/getrefreshdocker")
const getstopdocker = require("./apis/getstopdocker")
const postcreatedocker = require("./apis/postcreatedocker")
const postquerydocker = require("./apis/postquerydocker")

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
router.post("/")

router.get("/getalluser", getalluser)
router.get("/getnotice", getnotice)
router.get("/getscoreboard", getscoreboard)
router.get("/getuserlog", getuserlog)
router.get("/getlogout", getlogout)
router.get("/admingetsrc", admingetsrc)
router.get("/getrefreshdocker", getrefreshdocker)
router.get("/getstopdocker", getstopdocker)

module.exports = router













