<template>
  <div id="app">
      <header v-show="isLogin">
          <div class="pure-menu pure-menu-horizontal pure-menu-scrollable">
              <ul class="pure-menu-list" style="margin-top: -10px;margin-left: 5%;">
                  <li class="pure-menu-item" @click="torouter('/challenge')">
                      <a class="pure-menu-link"><img src="./assets/image/logo1.png" style="max-width: 40px; vertical-align: middle;"></a></li>
<li class="pure-menu-item" @click="torouter('/challenge')"><a class="pure-menu-link">SUS Platform 2020</a></li>
                  <li class="pure-menu-item" @click="torouter('/challenge')"><a class="pure-menu-link">挑战</a></li>
                  <li class="pure-menu-item" @click="torouter('/scoreboard')"><a class="pure-menu-link">排行</a></li>
                  <li class="pure-menu-item" @click="torouter('/notice')"><a class="pure-menu-link">公告</a></li>
                  <li class="pure-menu-item" @click="torouter('/usrscore')"><a class="pure-menu-link">得分详情</a></li>
                  <li class="pure-menu-item" @click="torouter('/usrinfo')"><a class="pure-menu-link">用户信息</a></li>
                  <li class="pure-menu-item" @click="torouter('/susrc')"><a class="pure-menu-link">bug与漏洞提交</a></li>
                  <li class="pure-menu-item" @click="logout"><a class="pure-menu-link">登出</a></li>
              </ul>
          </div>

      </header>
      <router-view></router-view>
<div class="azhe" >
            <center><h1>主办方</h1></center>
            <i></i>
            <div class="ds-org">
            <li class="org-img"><img src="https://5aku1em.github.io/images/suss.png"  alt="img" style="max-height: 120px;"></li>    
            </div>
            <center><h1>联系我们</h1></center>
            <i></i>
            <br>
            <div class="connect-us" style="text-align: center; ">
            <div class="dsq-brlink" style=" justify-content:center; rgba(0, 0, 0, 0.87); background-color: rgb(255, 255, 255); transition: all 
            450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; box-sizing: border-box; font-family: -webkit-tap-highlight-color: rgba(0, 0, 0, 0); box-shadow: rgba(0, 0, 0, 0.12) 
             0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px; height: auto;"><button tabindex="0" type="button" style="border: 10px; box-sizing: border-box; display: inline-block; -webkit-tap-highlight-color: 
             rgba(0, 0, 0, 0); cursor: pointer; text-decoration: none; padding: 0px; outline: none; 
             font-weight: inherit; position: relative; height: auto; width: 20%; border-radius: 2px; transition: all 450ms
              cubic-bezier(0.23, 1, 0.32, 1) 0ms; background-color: rgb(96, 125, 139);text-align: center; ">
              <div style="height: auto; border-radius: 2px; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 
              0ms; top: 0px;"><span style="position: relative; opacity: 1; font-size: 25px; letter-spacing: 0px; text-transform: 
              uppercase; font-weight: 500; user-select: none; padding: 10px; color: rgb(255, 255, 255); height: auto; 
              display: block;"><a href="mailto:sus2020@cyberspacesecurity.online" style="color:#ffffff">📧 send mail</a></span></div></button></div>
            
            </div>

    </div>
      <div style="text-align: center;height: 30px;margin-top: 0px;font-size: 13px;color: #8c939d">©2005-2020 Security Union of SEU  • All rights reserved</div>

   </div>
</template>
<script>
    import { MessageBox } from 'element-ui';
    import { Message } from 'element-ui';
export default {
  name: 'app',
  components: {
  },
    data(){
      return{

      }
    },

  methods:{
        torouter(path){
            this.$router.push(path)
        },
          logout(){


              MessageBox.confirm('是否退出登陆?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  Message({
                      type: 'success',
                      message: '已退出登陆'
                  });

                  this.$store.commit("logout")
                  // console.log("test:"+this.$store.state.isLogin)
                  this.$router.push("/")

              }).catch(() => {
                  Message({
                      type: 'info',
                      message: '已取消'
                  });
              });


      }
  },
  computed:{
    isLogin(){
        return this.$store.state.isLogin
    }
  },
    created() {
        window.$axios.defaults.headers.common['Access-Token'] = this.$store.state.accessToken

    }
}
</script>

<style>
a {text-decoration: none;
color: #FFFFFF;}
    #app{
        font-family: "Avenir", Helvetica, Arial, sans-serif;

    }
    header{
        height: 50vh;
        background-image: url(./assets/image/bg4.jpg);
        background-repeat: repeat;
        background-size: cover;
        background-position: center;
    }
    .logo1{
        display: inline-block;
        color: #bdc3c7;
        font-weight: bold;
    }
    .logo1:hover {
        color: darkcyan;

    }
    header a{
        cursor: pointer;
    }
    .commoninfo{
        margin: 0 5% 0 5%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
        border-radius: 15px;
        padding: 20px;
        position: relative;
        top: -8vh;
        z-index: 10px;
        background: #ffffff;
    }
img{
margin:40px;}
    .connect-us{
        text-align:center;
    }
.azhe{
        margin: 0 30px 0 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
        border-radius: 15px;
        padding: 20px;
        position: relative;
        top: -4vh;
        z-index: 10px;
        background: #ffffff;
    }
.azhe>i{
    width: 64px;
    margin: auto;
    height: 2px;
    display: block;
    background: #1677e3;
    background: linear-gradient(90deg,#1677e3 0,#003366);
}

</style>
