<template>
    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 400px;left: calc(50% - 200px);text-align: center;top:20vh">
            题库
        </div>

        <transition name="el-zoom-in-center">
            <div class="commoninfo" v-show="showtran">
                <div v-for="(value,key) in challenges" class="block-challenge">
                    <el-divider content-position="left">{{key}}</el-divider>
                    <div v-for="cha in value" class="detail-challenge" @click="openchallenge(cha)">
                        <span v-show="cha.solved" style="float: left"><i class="el-icon-circle-check"></i></span>
                        <br/>
                        <div style="font-size: 25px;display: inline-block">{{cha.value.challengename}}</div>
                        <div style="font-size: 13px;margin-bottom: 0px">{{cha.value.score+' 分  '+cha.value.solved+'解出/'+cha.value.submit+'提交'}}</div>
                    </div>
                </div>
            </div>
        </transition>
        <el-dialog
                title="题目描述:"
                :visible.sync="showsubmitdialog"
                width="50%">
            <span >
<!--                <div style="box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);font-size: 15px;padding: 20px;margin-left: 10px;margin-right: 10px">-->
                    <div style="font-size: 23px;">{{submitcha.value.challengename}}</div>
                    <div style="margin-top: 20px;font-size: 15px" v-html="submitcha.value.description">

                    </div>
                    <div style="margin-top: 50px">
                        <el-input placeholder="请输入flag" v-model="flag">
                            <el-button slot="append" @click="postflag">提交</el-button>
                        </el-input>
                    </div>
<!--                </div>-->
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { Notification } from 'element-ui'

    export default {
        name: "challenge",
        data(){
            return{
                showtran:false,
                challenges:[],
                submitcha:{
                    value:{
                        challengename:"初始值",
                        description:"初始值"
                    }
                },
                showsubmitdialog:false,
                flag:""
            }
        },
        mounted(){
            this.getchallenge()
            this.showtran=true
        },
        async beforeCreate() {


        },
        methods:{
            async getchallenge(){
                let res=await $axios.post("/postchallenge")
                this.challenges=res.data.challenge

            },
            openmsg(tl,msg) {
                const h = this.$createElement;

                Notification({
                    title: tl,
                    message: h('i', { style: 'color: teal'}, msg)
                });
            },
          async postflag(){

              let temp={
                  challengename:this.submitcha.value.challengename,
                  flag:this.flag,
              }
              let res=await $axios.post("/postflag",temp)
              if(res.data.code===0){
                  this.openmsg("通知","解答成功")
                  this.showsubmitdialog=false
                  this.flag=''
                  this.getchallenge()
              }else {
                  this.openmsg("通知",res.data.msg)
                  this.flag=''
              }
          },
          openchallenge(cha){
              this.submitcha=cha
              this.showsubmitdialog=true

          }
        }
    }
</script>

<style scoped>
    .block-challenge{
        display: flex;
        justify-content: flex-start;
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
