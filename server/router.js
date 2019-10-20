const Router=require('koa-router')
const postflag=require('./apis/postflag')
const addchallenge=require('./apis/adminaddchallenge')
const deletechallenge=require('./apis/admindeletechallenge')
const editchallenge=require('./apis/admineditchallenge')
const getalluser=require('./apis/admingetalluser')
const getnotice=require('./apis/getnotice')
const getscoreboard=require('./apis/getScoreboard')
const getuserlog=require('./apis/getuserlog')
const postedituser=require('./apis/postedituser')
const postlogin=require('./apis/postlogin')
const postsignup=require('./apis/postsignup')
const getlogout=require('./apis/getlogout')
const postuserscore=require('./apis/postuserscore')
const postchallenge=require('./apis/postchallenge')


const router=new Router({
    prefix: '/api'
})

router.post("/postflag",postflag)
router.post("/addchallenge",addchallenge)
router.post("/deletechallenge",deletechallenge)
router.post("/postedituser",postedituser)
router.post("/postlogin",postlogin)
router.post("/postsignup",postsignup)
router.post("/postchallenge",postchallenge)
router.post("/editchallenge",editchallenge)
router.post("/postuserscore",postuserscore)


router.get("/getalluser",getalluser)
router.get("/getnotice",getnotice)
router.get("/getscoreboard",getscoreboard)
router.get("/getuserlog",getuserlog)
router.get("/getlogout",getlogout)


module.exports=router













