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
                    <div style="margin-top: 20px;font-size: 15px" v-html="submitcha.value.description"></div>
                    <div v-if="submitcha.value.isDynamic==1" style="text-align: center;">
                        <el-progress justify="center" align="middle" :percentage="parseInt(dockerCreatePercentage)" :stroke-width="10" style="width: 60%;margin-top: 25px;margin:0 auto;"></el-progress>
                        <div style="font-size: 18px;" v-if="dockerstatus==1">Remain Time: {{parseInt(dockerRemainTime)}}s Your Port is {{port}}</div>
                        <el-row type="flex" justify="center" align="middle" style="margin-top: 15px;">
                            <el-button type="primary" @click="buildDocker" v-if="dockerstatus==0">建立容器</el-button>
                            <el-button type="success" @click="refreshDocker" v-if="dockerstatus==1">刷新服务</el-button>
                            <el-button type="warning" @click="stopDocker" v-if="dockerstatus==1">停止服务</el-button>
                        </el-row>
                    </div>
                    <div style="margin-top: 40px">
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
    import moment from 'moment'
    export default {
        name: "challenge",
        data(){
            return{
                port: null,
                dockerRemainTime: 0,
                dockerCreatePercentage:0,
                dockerstatus:0,
                showtran:false,
                challenges:[],
                submitcha:{
                    value:{
                        challengename:"初始值",
                        description:"初始值",
                        isDynamic:false
                    }
                },
                showsubmitdialog:false,
                flag:""
            }
        },
        mounted(){
            this.getchallenge();
            this.showtran=true;
            this.timer = setInterval(() => {
                if(this.dockerstatus === 1){
                    let NowTime = +moment();
                    this.dockerRemainTime = (7200 - (NowTime-this.$store.state.dockerInfo.timestamp)/1000);
                    this.dockerCreatePercentage = (this.dockerRemainTime*100/7200)
                }
            }, 1000)
        },
        async beforeCreate() {

        },
        methods:{
            async buildDocker(){
                let temp={
                    challengename: this.submitcha.value.challengename,
                }
                let res=await $axios.post("/postcreatedocker",temp)
                console.log(res.data)
                if(res.data.code===0){
                    if(res.data.dockerTimeout !== null){
                        let dockerInfo = {
                            timestamp: res.data.dockerTimeStamp,
                            timeout: res.data.dockerTimeout,
                            port: res.data.port
                        }
                        this.$store.commit('setDockerTime',dockerInfo)
                        this.port = res.data.port
                        this.openmsg("通知","创建容器成功")
                        this.dockerstatus=1
                    }
                    else{
                        this.openmsg("通知","创建容器失败")
                    }
                }else if (res.data.code === 1){
                    this.openmsg("通知",res.data.msg)
                    this.dockerstatus=1
                    refreshDocker()
                }else{
                    this.openmsg("通知",res.data.msg)
                }
            },
            async stopDocker(){
                let res=await $axios.get("/getstopdocker")
                this.openmsg("通知",res.data.msg)
                if(res.data.code===0){
                    this.port = null
                    let dockerInfo = {
                        timestamp: 0,
                        timeout: null,
                        port: null
                    }
                    this.$store.commit('setDockerTime',dockerInfo)
                }
                this.dockerstatus=0
                this.dockerRemainTime=0
                this.dockerCreatePercentage=0
            },
            async refreshDocker(){
                let res=await $axios.get("/getrefreshdocker")
                this.openmsg("通知",res.data.msg)
                if(res.data.code===0){
                    let dockerInfo = {
                        timestamp: res.data.dockerTimeStamp,
                        timeout: res.data.dockerTimeout,
                        port: this.$store.state.dockerInfo.port
                    }
                    this.$store.commit('setDockerTime',dockerInfo)
                }
            },
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
    .el-row {
        width: 100%;
    }
</style>
