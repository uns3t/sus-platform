## SUS Platform 文档

#### 技术栈

vue+koa2+mongodb



#### 功能描述



![打包详情](C:\Users\uns3t\Desktop\vue\susCTF\susctf\image_for_readme\build.png)

spa应用首屏加载文件大小为:  1.2MB，首次加载可能需要较长时间



![](C:\Users\uns3t\Desktop\vue\susCTF\susctf\image_for_readme\index.png)

登陆页面，支持markdown编写公告



![](C:\Users\uns3t\Desktop\vue\susCTF\susctf\image_for_readme\challenge.png)

题库页面，由弹出框来显示题目详情和提交flag



![](C:\Users\uns3t\Desktop\vue\susCTF\susctf\image_for_readme\scoreboard.png)

排行榜页面，稍显简陋，但点击即可跳转该队伍的得分详情



![](C:\Users\uns3t\Desktop\vue\susCTF\susctf\image_for_readme\socre.png)

得分详情，加入了echarts的雷达图，做题清空可视化(可以当五边形战士)



![](C:\Users\uns3t\Desktop\vue\susCTF\susctf\image_for_readme\man1.png)



管理页面，可以添加删除修改题目，查看队伍flag提交的日志，以及所有用户的注册信息





#### 测试情况

admin添加题目:每个方向一道      ok

admin修改题目:每道题目修改一次    ok

注册用户:两个用户     ok

登陆: 两个用户的登陆  ok

修改用户信息: 两用户分别修改一次信息  ok

注销: 两用户注销   ok

答题:  每道题一次错误flag，一次正确flag  ok

检查:排行榜情况，分数页面情况，admin用户情况，admin所有用户flag提交情况  ok

admin删除题目:admin删除4道题目   ok

线上测试:    ok



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



#### 功能

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



#### 文件架构

后端项目架构:

```
./apis //具体功能实现

./router.js //后端路由

./db //数据库配置与model定义

./app.js //整体逻辑
```

接口数据格式

```
   全局前缀:api/

   postflag:{
      req:{
           challengename:string,

           flag:string,          
      },
      res:{
          code:number
      }        
   }
   addchallenge{
       req:{
           challengename:string,
           type:string,
           description:string(html)
           flag:string,
           score:number
       }
       res:{
           code:number
       }
   }
   deletechallenge{
        req:{
            challengename:string
        },
        res:{
             code:number
        }               
   }
   postedituser{
       req:{
           pwd:string,
           email:string,
           qq: string,
           phone:string,
       },
       res:{
           code:number
       }
   }
   postlogin{
        req:{
            username:string,
            pwd:string
        } 
        res:{
            code:number
        }      
   }
   postsignup{
       req:{
               username：string,
            pwd:string,
            name:string,
            email:string,
            qq: string,
            phone:string,
            studentid:string
        },
     res:{
            code:number,
     }
   }
   postchallenge{
           req:{
               null
           }
           res:{
               challenges:[
                   cha:{
                       issolved:bool,
                       challenge:Object
                   }
               ]
           }

   }
   editchallenge{
       req:{
           challengename:string,
           type:string,
           description:string(html)
           flag:string,
           score:number
       }
       res:{
           code:number
       }
   }
   postuserscore{
       //详见代码
   }
   getalluser{
       //详见代码
   }
   getnotice{
       index.md- 转换 >html
   }
   getscoreboard{
       users:排序过后
   }
   getuserlog{
       //根据用户权限有区分
   }
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
