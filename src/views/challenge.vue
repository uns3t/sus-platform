<template>
    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 400px;left: calc(50% - 200px);text-align: center;top:20vh">
            题库
        </div>
        <div class="commoninfo">
            <div class="block-challenge">
                <el-divider content-position="left">pwn</el-divider>
                <div class="detail-challenge">
                    <span style="float: left"><i class="el-icon-circle-check"></i></span>
                    <br/>
                    <div style="font-size: 30px;display: inline-block">level</div>
                    <div style="font-size: 13px;margin-bottom: 0px">1000分 25解出/31提交</div>
                </div>
                <button @click="postflag">提交</button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "challenge",
        data(){
            return{
                challenges:[]
            }
        },
        async beforeCreate() {
            console.log(this.$store.state.userInfo)
            let res=await $axios.post("/postchallenge",this.$store.state.userInfo)
            this.challenges=res.data

            console.log(this.challenges)
        },
        methods:{
          async postflag(){
              let temp={
                  challengename:"test",
                  flag:"flag{test}",
                  username:"test"
              }
              let res=await $axios.post("/postflag",temp)
              console.log(res.data)
          }
        }
    }
</script>

<style scoped>
    .block-challenge{
        /*margin: 10px 8% 10px 8%;*/
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .detail-challenge{
        width: 160px;
        height: 100px;
        padding: 20px;
        margin: 10px;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        text-align: center;
    }
    .detail-challenge:hover{
        box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.5);
        cursor: pointer;
        color: darkred;
    }
</style>
