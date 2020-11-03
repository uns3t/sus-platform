<template>
    <div>

        <div class="header">
            <div style="margin: 0px 5% 5px 5%;padding: 10px">
                <img src="../assets/image/logo1.png" style="max-width: 50px;margin-bottom: -15px">
                <div class="logo0">SUS Platform 2020</div>
        	<div class="logo0" @click="showlogin=true">Login</div>
                <div class="logo0" @click="showsignup=true">Register</div>    
	</div>
            <div style="margin:0 auto;margin-top: 100px;width: 400px;">
<!--                <div style="text-align: center;font-size: 45px;color: #f0f0f0;margin-bottom: 10px">know it and hack it</div>-->
                <div style="text-align: center;font-size: 50px;color: #f0f0f0;margin-bottom: 10px">SUSCTF 2020</div>
                <div style="text-align: center;font-size: 18px;color: #f0f0f0;margin-bottom: 30px;color: #8c939d">
                    东南大学SUSCTF竞赛平台
                </div>
                <div style="text-align: center">
                    <a class="pure-button" @click="showlogin=true" style="background-color:transparent;border: 1.5px #8c939d solid;color: #f0f0f0;margin: 10px">登 录</a>
                    <a class="pure-button" @click="showsignup=true" style="background-color:transparent;border: 1.5px #8c939d solid;color: #f0f0f0;margin: 10px">注 册</a>
                </div>

            </div>
        </div>
        <transition name="el-zoom-in-center">
            <div class="logincontent" v-html="notice" v-show="showtran">

            </div>
        </transition>

        

        <el-dialog
                title="重置密码"
                :visible.sync="showPassChange"
                width="400px"
        >
            <span>
                <el-form label-position="left" label-width="80px" :model="passchangeFrom" size="small">
                <el-form-item label="邮箱">
                    <el-input :placeholder=emailForm.email v-model="passchangeFrom.email" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input placeholder="请输入邮箱验证码" v-model="passchangeFrom.verification" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input placeholder="请输入新密码" v-model="passchangeFrom.newpass" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input placeholder="请再次输入相同密码" v-model="passchangeFrom.confirmpass" show-password></el-input>
                </el-form-item>
            </el-form>
            </span>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="postpasschange" size="small">确定</el-button>
            </span>
        </el-dialog>
        
        <el-dialog
                title="邮箱验证"
                :visible.sync="showEmaillog"
                width="400px"
        >
            <span>
                <el-form label-position="left" label-width="80px" :model="emailForm" size="small">
                <el-form-item label="邮箱">
                    <el-input placeholder="请输入注册所用邮箱" v-model="emailForm.email"></el-input>
                </el-form-item>
            </el-form>
            </span>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="postemailForm" size="small">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="平台身份认证"
                :visible.sync="showlogin"
                width="400px"
        >
            <span>
                <el-form label-position="left" label-width="80px" :model="loginform" size="small">
                <el-form-item label="用户">
                    <el-input placeholder="请输入用户名" v-model="loginform.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input placeholder="请输入密码" v-model="loginform.pwd" show-password></el-input>
                </el-form-item>
            </el-form>
            </span>
            
            <span slot="footer" class="dialog-footer">
            <el-button @click="AandB" size="small">忘记密码</el-button>
                <el-button @click="postLoginForm" size="small">登录</el-button>
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
                   
                </el-form>
                <el-form label-position="right" label-width="80px" :model="signupform" size="small" style="margin: 20px">
                    <el-form-item label="一卡通号">
                        <el-input placeholder="请输入您的一卡通号" v-model="signupform.ecard" ></el-input>
                    </el-form-item>
		    <el-form-item label="学号">
                        <el-input placeholder="请输入您的学号" v-model="signupform.studentid" ></el-input>
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

    </div>
</template>

<script>
    import { Notification } from 'element-ui'
    
    export default {
        name: "login",
        data(){
            return{
                showtran:false,
                showlogin:false,
                showsignup:false,
                showEmaillog:false,
                showPassChange:false,
                showVerCodedialog:false,
                notice:'',
                showisseu:false,
                passchangeFrom:{
                    newpass:'',
                    confirmpass:'',
                    email:'',
                    verification:''
                },
                emailForm:{
                    email:''
                },
                loginform:{
                    username:'',
                    pwd:''
                },
                signupform:{
                    username:'',
                    pwd:'',
                    pwdconfirm:'',
                    email:'',
                    studentid:'',
		            ecard:'',
                    phone:'',
                    name:'',
                    qq:'',
                }
            }
        },
        mounted(){
            this.showtran=true
        },
        methods: {
            openmsg(tl,msg) {
                const h = this.$createElement;

                Notification({
                    title: tl,
                    message: h('i', { style: 'color: teal'}, msg)
                });
            },
            AandB(){
                this.showEmaillog=true
                this.showlogin=false
                this.emailForm={}
            },
            async postpasschange(){
                this.passchangeFrom.email = this.emailForm.email
                let res=await $axios.post("/postpasschange",this.passchangeFrom)
                if(res.data.code==0){
                    this.openmsg("通知","密码修改成功,请重新登录")
                    this.showPassChange = false
                }else{
                    this.openmsg("错误",res.data.msg)
                }
            },
            async postemailForm(){
                console.log(this.emailForm.email)
                let res=await $axios.post("/postemail",this.emailForm)
                if(res.data.code==0){
                    this.openmsg("通知","邮件已发送,请前往邮箱确认验证码")
                    this.showPassChange = true 
                    this.showEmaillog = false
                }else{
                    this.openmsg("错误",res.data.msg)
                }
            },
            async postLoginForm(){
                let res=await $axios.post("/postlogin",this.loginform)
                if(res.data.code==0){
                    this.openmsg("通知","登陆成功,token将保存一周")
                    this.showlogin=false
                    this.$store.commit('login',res.data.token)
                    this.$store.commit('userInfo',this.loginform)
                    this.$router.replace('/challenge')
                }else {
                    this.openmsg("错误",res.data.msg)
                }

            },


            async postsignup(){

                let newsignupform={
                    isnotSeu:this.showisseu,
                    signupform:this.signupform
                }
                let res=await $axios.post("/postsignup",newsignupform)
                if(res.data.code==0){
                    this.openmsg("通知","注册成功")
                    this.showsignup=false
                    this.signupform={}
                }else {
                    this.openmsg("错误",res.data.msg)
                }
            }
        },

        async created() {
            if(this.$store.state.isLogin){
                this.$router.replace("/notice")
            }
            let res=await $axios.get("/getnotice")
            this.notice=res.data.readme
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
    .logo0{
        margin: 0px 3% 0px 3%;
	display: inline-block;
        font-size: 20px;
        color: #f0f0f0;
        font-weight: bold;
    }
    .logo0:hover {
        color: darkcyan;
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
        top: -5vh;
        z-index: 10px;
        background: #ffffff;
        font-family: SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;

    }


</style>
