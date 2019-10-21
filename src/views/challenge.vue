<template>
    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 400px;left: calc(50% - 200px);text-align: center;top:20vh">
            题库
        </div>
        <div class="commoninfo">
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
        <el-dialog
                :title="submitcha.value.challengename"
                :visible.sync="showsubmitdialog"
                width="60%">
            <span >
                <div style="box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);font-size: 15px;padding: 20px;margin-left: 10px;margin-right: 10px">
                    <div style="font-size: 20px;">题目描述:</div>
                    <div style="margin-top: 20px;font-size: 15px" v-html="submitcha.value.description">

                    </div>
                    <div style="margin-top: 50px">
                        <el-input placeholder="请输入flag">
                            <el-button slot="append" @click="postflag">提交</el-button>
                        </el-input>
                    </div>
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "challenge",
        data(){
            return{
                challenges:[],
                submitcha:{
                    value:{
                        challengename:"初始值",
                        description:"初始值"
                    }
                },
                showsubmitdialog:false
            }
        },
        async beforeCreate() {
            let temp={
                challengename:"test",
                flag:"flag{test}",
                username:"test"
            }
            let res=await $axios.post("/postchallenge",temp)
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
