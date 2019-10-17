<template>
  <div id="app">
      <header v-if="isLogin">
              <el-menu :default-active="activeIndex" class="el-menu-demo" router mode="horizontal">
                  <el-menu-item>
                      <img src="./assets/image/logo.png" style="max-width: 50px;">
                      <div class="logo1">SUS Platform 2019</div>
                  </el-menu-item>

                  <el-menu-item index="/challenge">题库</el-menu-item>
                  <el-menu-item index="/scoreboard">排行榜</el-menu-item>
                  <el-menu-item index="/notice">公告</el-menu-item>
                  <el-menu-item index="/usrinfo" style="float: right">个人信息</el-menu-item>
              </el-menu>
      </header>
      <router-view></router-view>

  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
  },
    data(){
      return{
          activeIndex: '/challenge',
      }
    },
  methods:{

  },
  computed:{
    isLogin(){
        return this.$store.state.isLogin
    }
  }
}
</script>

<style>
    body{
        /*background-image: url(./assets/image/bg.png);*/
        /*background-repeat: repeat;*/
        /*background-size: cover;*/
        /*margin: 0;*/
    }
    #app{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;

    }
    header{

    }
    .logo1{
        display: inline-block;
        font-size: 20px;
        color: #303133;
        font-weight: bold;
    }
    .logo1:hover {
        color: darkred;
    }



</style>
