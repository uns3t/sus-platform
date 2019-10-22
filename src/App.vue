<template>
  <div id="app">
      <header v-show="isLogin">
          <div class="pure-menu pure-menu-horizontal pure-menu-scrollable">
              <ul class="pure-menu-list" style="margin-top: -10px;margin-left: 5%;">
                  <li class="pure-menu-item" @click="torouter('/challenge')"><a class="pure-menu-link" style="margin-bottom: 13px">
                      <img src="./assets/image/logo1.png" style="max-width: 40px;margin-bottom: -10px;">
                      <div class="logo1">SUS Platform 2019</div>
                  </a></li>
                  <li class="pure-menu-item" @click="torouter('/challenge')"><a class="pure-menu-link">挑戦</a></li>
                  <li class="pure-menu-item" @click="torouter('/scoreboard')"><a class="pure-menu-link">排行</a></li>
                  <li class="pure-menu-item" @click="torouter('/notice')"><a class="pure-menu-link">公告</a></li>
                  <li class="pure-menu-item" @click="torouter('/usrscore')"><a class="pure-menu-link">得分详情</a></li>
                  <li class="pure-menu-item" @click="torouter('/usrinfo')"><a class="pure-menu-link">用户信息</a></li>
                  <li class="pure-menu-item" @click="logout"><a class="pure-menu-link">登出</a></li>
              </ul>
          </div>
          <div>

          </div>
      </header>
      <router-view></router-view>
      <div style="text-align: center;height: 30px;margin-top: -30px;font-size: 13px;color: #8c939d">©2005-2019 Security Union of SEU  • All rights reserved</div>

  </div>
</template>

<script>


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


              this.$confirm('是否退出登陆?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.$message({
                      type: 'success',
                      message: '已退出登陆'
                  });

                  this.$store.commit("logout")
                  // console.log("test:"+this.$store.state.isLogin)
                  this.$router.push("/")

              }).catch(() => {
                  this.$message({
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
        top: -10vh;
        z-index: 10px;
        background: #ffffff;
    }


</style>
