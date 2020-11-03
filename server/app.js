const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const mongoose=require('mongoose')
const dbs=require('./db/config')
const router=require('./router')
const jwtTool=require("./tools/token")
const static = require('koa-static');


app.use(static(__dirname+'/public/'));



// error handler
onerror(app)


//解决跨域问题
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous','Access-Token'],
}));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//
app.use(async (ctx,next)=>{

  let usertoken=ctx.request.body.token||ctx.request.headers['access-token']

  let tokencode=-1
  if(usertoken){
    try {
      let tokentemp=jwtTool.jwtdecode(usertoken)
      // console.log(tokentemp)


      if(tokentemp.isadmin===1){
        tokencode=1
      }else {
        tokencode=0
      }
      ctx.state.userinfo=tokentemp
    }catch (e) {
      ctx.response.status=401
    }
  }else{
    tokencode=-1
    //未登录的状态
  }
  ctx.state.tokencode=tokencode

  await next()
})
//连接数据库

mongoose.connect(dbs.dbpath,{ useNewUrlParser: true })

// routes

app.use(router.routes()).use(router.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(3000,'0.0.0.0',()=>{
  console.log("后端启动并监听 3000端口")
    });

module.exports = app
