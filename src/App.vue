<template>
  <div id="app">

      <router-view></router-view>

  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
  },
  methods:{
    toOther(e){
      this.$router.replace(e)
    }
  }
}
</script>

<style>

  header{
    height: 55px;
    background: #2c3e50;
    padding: 0;
  }
  header li{
    font-size: 18px;

  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  footer{
    margin-bottom: -50px;
    z-index: 9999;
    height: 100px;
    background: #fff0ff;
    text-align: center;
    padding-top: 10px;
  }
  footer a{
    font-size: 12px;
    color: #c56cf0;
    text-decoration:none;
    margin: 20px;
  }


</style>
