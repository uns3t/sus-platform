## SUS Platform 文档

#### 技术栈

vue+koa2+mongodb

#### 文件结构

基于vue-cli3 后端内容与前端src文件夹同级

#### 开发环境运行方法

```
在前端文件夹中:
cnpm i
yarn serve

Server文件夹中:
cnpm i
yarn start      
//start 调用了nodemon 实现后端热更新

关于数据库：
则需要单独安装mongodb
具体数据库名见server/db/config.js
```

#### 完善目标

1. 完善前后端接口数据

2. 完善前端响应式布局

3. 完善token功能

4. 增加页面趣味性，增加一些梗

5. 完善前端页面功能

6. 完善admin认证










前端：

1. 用户模块

   满足登陆注册登出功能以及一个token功能(vuex状态管理)

   以及一个单独的修改用户信息的功能

   选手做题信息，要利用chartjs之类的框架进行分数可视化

2. 题目功能

   满足基本的展现题目dialog，提交flag后响应式的改变题目样式。

   排行榜: 利用生命周期函数在created时请求后端排行榜信息，而暂不要求轮询修改

3. 首页Markdown渲染

   完成在登陆页面时及时渲染markdown，方便根据情况修改说明

4. 美观性与响应式:

   因为准备用webgl画背景，可能响应式页面比较难以实现了

5. admin页面:

   提供添加题目，修改题目的功能

后端:

1. 主要是数据库CRUD功能，以及能够提供token，以区别普通用户与admin

2. 动态分数功能的实现

3. 必须进行token验证

后端项目架构:

```
./apis //具体功能实现

./router.js //后端路由

./db //数据库配置与model定义

./app.js //整体逻辑
```

接口数据格式

```
   //待更新
```

数据库model:

只需要三个collection即可，userdb,challengedb,和用户做题记录 logdb

```

userdb    //排行榜查询这个collection
{
    username:String
    pwd:String   (md5存储)     
    userscore: int32
    ----注册时非必须(针对校内的同学)
    studentid:String
    phone:String
    name:string
    qq:string
    email:String

}

challengedb{    //题库查询
    challengename:String
    flag:String
    score: int32
    solved: int32
    submit: int32    
    type: String   //题目的方向
}

logdb{   //查看个人信息时进行调用
    username:String
    challengename:String
    solvedtime: Date
    type: string
    solvedscore: int32    //解决题目时的分数    
}
```
