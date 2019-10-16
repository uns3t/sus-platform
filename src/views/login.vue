<template>
    <div>
        <div class="header">
            <img src="../assets/image/logo.png" style="max-width: 50px;margin-bottom: -15px">
            <div class="logo1">SUS Platform 2019</div>
            <div class="logo2">
                <el-link @click="dialogVisible=true">前往注册</el-link>
            </div>
        </div>
        <el-divider>know it and hack it</el-divider>
        <div class="loginmode">
            <div style="font-size: 20px;font-weight: bold;text-align: left;">
                <img src="../assets/image/logo.png" style="max-width: 50px;margin-bottom: -15px">
                身份认证
            </div>
            <br/>
            <br/>
            <br/>
            <el-form label-position="left" label-width="80px" :model="loginform" size="small">
                <el-form-item label="用户名">
                    <el-input placeholder="请输入用户名" v-model="loginform.usrname"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input placeholder="请输入密码" v-model="loginform.pwd" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="postLoginForm">登 陆</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog
                title="平台身份注册"
                :visible.sync="dialogVisible"
                width="400px"
                >
            <span>
                <el-form label-position="right" label-width="80px" :model="signupform" size="small" style="margin: 20px">
                    <el-form-item label="用户名">
                        <el-input placeholder="请输入用户名" v-model="signupform.usrname"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input placeholder="请输入密码" v-model="signupform.pwd" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input placeholder="请确认密码" v-model="signupform.pwdconfirm" show-password></el-input>
                    </el-form-item>
                </el-form>
            </span>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">注 册</el-button>
            </span>
        </el-dialog>
        <div style="position: fixed;bottom: 20px;left: calc(50% - 170px);font-size: 13px;color: #8c939d">@2005-2019 Security Union of SEU  • All rights reserved</div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                loginform:{
                    usrname:'',
                    pwd:''
                },
                dialogVisible:false,
                signupform:{
                    usrname:'',
                    pwd:'',
                    pwdconfirm:''
                }
            }
        },
        methods: {
            async postLoginForm(){
                // let res=await $axios.post("/login",this.loginform)
                // console.log(res)
                this.$store.commit('logout')
                // this.$router.replace('/challenge')
            }
        },

    }
</script>

<style scoped>
    .header{
        margin: 5px 10% 0 10%;
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


</style>
