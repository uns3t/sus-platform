<template>
    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 400px;left: calc(50% - 200px);text-align: center;top:20vh">
            修改信息
        </div>
        <transition name="el-zoom-in-center">
            <div class="commoninfo" v-show="showtran">
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
        </transition>

    </div>

</template>

<script>
    import { Notification } from 'element-ui'

    export default {
        name: "information",
        data(){
            return{
                userform:{
                    username:'',
                    pwd:'',
                    pwdconfirm:'',
                    email:'',
                    qq:'',
                    phone:''
                },
                showtran:false
            }
        },
        methods:{
            openmsg(tl,msg) {
                const h = this.$createElement;

                Notification({
                    title: tl,
                    message: h('i', { style: 'color: teal'}, msg)
                });
            },
            async posteidtuser(){
                let temp={
                    userform:this.userform
                }
                let res=await $axios.post("/postedituser",temp)
                if(res.data.code===0){
                    this.openmsg("成功","信息修改成功请重新登陆")
                    this.$store.commit("logout")
                }else {
                    this.openmsg("错误",res.data.msg)
                }
            }
        },
        created() {
            this.userform=this.$store.state.userInfo
            console.log(this.$store.state.userInfo)
        },
        mounted() {
            this.showtran=true
        }
    }
</script>

<style scoped>

</style>
