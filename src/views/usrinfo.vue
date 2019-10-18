<template>
    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 400px;left: calc(50% - 200px);text-align: center;top:15vh">
            修改信息
        </div>
        <div class="userinfo">
            <div style="padding: 10px;width: 400px;margin: 0 auto">
                <el-form label-position="left" label-width="80px" :model="userform" size="medium" style="margin: 20px">
                    <el-form-item label="用户名">
                        <el-input :placeholder=userform.username v-model="userform.username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input placeholder="请输入密码" v-model="userform.pwd" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input placeholder="请确认密码" v-model="userform.pwdconfirm" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input placeholder="请输入邮箱" v-model="userform.email" ></el-input>
                    </el-form-item>
                    <el-form-item label="QQ">
                        <el-input placeholder="请输入您的QQ" v-model="userform.qq" ></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input placeholder="请输入您的电话" v-model="userform.phone" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="posteidtuser">修改信息</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "information",
        data(){
            return{
                userform:{}
            }
        },
        methods:{
            async posteidtuser(){
                let res=await $axios.post("/postedituser",this.userform)
                if(res.data.code===0){
                    alert("修改成功请重新登陆")
                }
            }
        },
        created() {
            this.userform=this.$store.state.userInfo
            console.log(this.$store.state.userInfo)
        }
    }
</script>

<style scoped>
    .userinfo{
        margin: 0 5% 0 5%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
        border-radius: 15px;
        padding: 20px;
        position: relative;
        top: -20vh;
        z-index: 10px;
        background: #ffffff;
    }
</style>
