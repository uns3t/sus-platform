<template>
    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 600px;left: calc(50% - 300px);text-align: center;top:20vh">
            漏洞报告与平台建议
        </div>

        <transition name="el-zoom-in-center">
            <div class="commoninfo" v-show="showtran">

                <div class="banner">
                    <p>作为一个刚接触前端不到半年的切图仔...尽管花了很多时间改bug，但平台不合理的地方也难以避免</p>
                    <p>如果您在使用中遇到了bug可以在这里提交，我们会尽快修改</p>
                    <p>同时也欢迎您进行安全测试，如果发现漏洞请告知我们</p>
                    <p><del>积攒下来的bug会一起交给19级的学弟学妹（滑稽）</del></p>
                </div>

                <el-divider content-position="left">感谢您的支持</el-divider>

                <div style="width: 80%;margin-top: 50px;margin: 0 auto;">
                    <el-form ref="form" :model="susrcform" label-width="80px">
                      <el-form-item label="类型">
                        <el-select v-model="susrcform.type" placeholder="选择类型">
                          <el-option label="安全漏洞" value="平台安全漏洞"></el-option>
                          <el-option label="功能性bug" value="平台功能bug"></el-option>
                          <el-option label="平台开发建议" value="平台开发建议"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="具体内容">
                        <el-input type="textarea" v-model="susrcform.description" rows="7" placeholder="请在此填写"></el-input>
                      </el-form-item>

                    </el-form>
                    <el-button type="primary" @click="postsusrc">提 交</el-button>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
    import { Notification } from 'element-ui'


    export default {
        name: "susrc",
        data(){
          return {
              showtran:false,
              susrcform:{
                type:"",
                  description:""
              }
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
            async postsusrc() {
                let res=await $axios.post("/postsusrc",this.susrcform)
                if(res.data.code==0){
                    this.openmsg("通知","反馈成功")
                }else {
                    this.openmsg("错误",res.data.msg)
                }
            }
        },
        mounted(){
            this.showtran=true
        },
    }
</script>

<style scoped>
    .banner{
        width: 80%;font-family: SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;
        margin-bottom: 30px;
        padding: 20px;
    }
</style>
