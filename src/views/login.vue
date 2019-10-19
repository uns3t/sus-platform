<template>
    <div>

        <div class="header">
            <div style="margin: 0px 5% 5px 5%;padding: 10px">
                <img src="../assets/image/logo1.png" style="max-width: 50px;margin-bottom: -15px">
                <div class="logo1">SUS Platform 2019</div>
            </div>
            <div style="margin:0 auto;margin-top: 50px;width: 300px;">
                <div style="text-align: center;font-size: 45px;color: #f0f0f0;margin-bottom: 10px">know it and hack it</div>
                <div style="text-align: center;font-size: 18px;color: #f0f0f0;margin-bottom: 30px">
                    东南大学SUSCTF竞赛平台
                </div>
                <div style="text-align: center">
                    <a class="pure-button" @click="showlogin=true" style="background-color:transparent;border: 1.5px #8c939d solid;color: #f0f0f0;margin: 10px">登 陆</a>
                    <a class="pure-button" @click="showsignup=true" style="background-color:transparent;border: 1.5px #8c939d solid;color: #f0f0f0;margin: 10px">注 册</a>
                </div>

            </div>
        </div>
        <div class="logincontent" v-html="notice">

        </div>

        <el-dialog
                title="平台身份认证"
                :visible.sync="showlogin"
                width="400px"
        >
            <span>
                <el-form label-position="left" label-width="80px" :model="loginform" size="small">
                <el-form-item label="用户名">
                    <el-input placeholder="请输入用户名" v-model="loginform.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input placeholder="请输入密码" v-model="loginform.pwd" show-password></el-input>
                </el-form-item>
            </el-form>
            </span>

            <span slot="footer" class="dialog-footer">
                <el-button @click="postLoginForm" size="small">登 陆</el-button>
            </span>
        </el-dialog>


        <el-dialog
                title="平台身份注册"
                :visible.sync="showsignup"
                width="400px"
                >
            <span>
                <el-form label-position="right" label-width="80px" :model="signupform" size="small" style="margin: 20px">
                    <el-form-item label="用户名">
                        <el-input placeholder="请输入用户名" v-model="signupform.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input placeholder="请输入密码" v-model="signupform.pwd" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input placeholder="请确认密码" v-model="signupform.pwdconfirm" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input placeholder="请输入邮箱" v-model="signupform.email" ></el-input>
                    </el-form-item>
                    <el-form-item label="学号">
                        <el-input placeholder="请输入学号" v-model="signupform.studentid" ></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input placeholder="请输入您的姓名" v-model="signupform.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="QQ">
                        <el-input placeholder="请输入您的QQ" v-model="signupform.qq" ></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input placeholder="请输入您的电话" v-model="signupform.phone" ></el-input>
                    </el-form-item>
                </el-form>
            </span>

            <span slot="footer" class="dialog-footer">
                <el-button @click="postsignup" size="small">注 册</el-button>
            </span>
        </el-dialog>

        <div style="text-align: center;height: 30px;margin-top: -30px;font-size: 13px;color: #8c939d">©2005-2019 Security Union of SEU  • All rights reserved</div>
    </div>
</template>

<script>
    import "../assets/image/bg3.jpg"
    export default {
        name: "login",
        data(){
            return{

                showlogin:false,
                showsignup:false,
                notice:'',


                loginform:{
                    username:'',
                    pwd:''
                },

                signupform:{
                    username:'',
                    pwd:'',
                    studentid:'',
                    phone:'',
                    name:'',
                    qq:'',
                    email:'',
                    pwdconfirm:''
                }
            }
        },
        methods: {
            async postLoginForm(){
                let res=await $axios.post("/postlogin",this.loginform)
                console.log(res)
                if(res.data.code==0){
                    alert("登陆成功")
                    this.showlogin=false
                }
                this.$store.commit('login',this.loginform)
                this.$store.commit('userInfo',this.loginform)
                this.$router.replace('/challenge')
            },
            async postsignup(){
                let res=await $axios.post("/postsignup",this.signupform)
                console.log(res)
                if(res.data.code==0){
                    alert("注册成功")
                    this.showsignup=false
                }
            }
        },
        async created() {
            let res=await $axios.get("/getnotice")
            this.notice=res.data
        }

    }
</script>

<style scoped>
    .header{
        height: 60vh;
        background-image: url(../assets/image/bg4.jpg);
        background-repeat: repeat;
        background-size: cover;
        background-position: center;
        margin: 0;

    }
    .logo1{
        display: inline-block;
        font-size: 20px;
        color: #f0f0f0;
        font-weight: bold;
    }
    .logo1:hover {
        color: darkcyan;
    }
    .logo2{
        float: right;
        display: inline-block;
        font-size: 15px;
        font-weight: bold;
        margin-top: 20px;
    }
    .loginmode{
        width: 300px;
        padding: 40px;
        position: absolute;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        height: 300px;
        top:calc(50% - 180px);
        left:calc(70% - 180px);
        background: rgba(255,255,255,1);
    }
    .logincontent{
        margin: 0 30px 0 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
        border-radius: 15px;
        padding: 30px;
        position: relative;
        top: -8vh;
        z-index: 10px;
        background: #ffffff;
    }


</style>
