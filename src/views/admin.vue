<template>
    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 400px;left: calc(50% - 200px);text-align: center;top:20vh">
            管理
        </div>
        <transition name="el-zoom-in-center">
            <div class="commoninfo" v-show="showtran">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="题目管理" name="first">
                        <div style="height: 200px;text-align: center">
                            <div style="font-size: 40px;color: darkmagenta;margin-top: 20px">
                                <i class="el-icon-circle-plus" @click="openaddcha"></i>
                                <i class="el-icon-remove" @click="opendeletecha"></i>
                                <i class="el-icon-delete" @click="opendeletedocker"></i>
                                <i class="el-icon-edit" @click="openeditcha"></i>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="flag提交日志" name="second">
                        <el-table
                                :data="flaglogs"
                                style="width: 100%">
                            <el-table-column
                                    type="index"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    prop="username"
                                    label="队名"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="challengename"
                                    label="题目"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="type"
                                    label="类型"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="submittime"
                                    label="提交时间"
                                    width="250">
                            </el-table-column>
                            <el-table-column
                                    prop="issolved"
                                    label="是否正确"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="flag"
                                    label="flag"
                            >
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="用户管理" name="third">
                        <div>
                            <el-table
                                    :data="userlog"
                                    style="width: 100%"
                                    :default-sort = "{prop: 'username', order: 'descending'}"
                            >
                                <el-table-column
                                        prop="username"
                                        label="用户名"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="姓名"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="studentid"
                                        label="学号"
                                        sortable
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="email"
                                        label="邮箱"
                                        sortable
                                        width="180">
                                </el-table-column>

                                <el-table-column
                                        prop="phone"
                                        label="电话"
                                        width="180">
                                </el-table-column>

                                <el-table-column
                                        prop="qq"
                                        label="QQ"
                                        sortable
                                        width="180">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="容器列表" name="sixth">
                        <div>
                            <el-table
                                    :data="dockerlogs"
                                    style="width: 100%"
                                    :default-sort = "{prop: 'username', order: 'descending'}"
                            >
                                <el-table-column
                                        prop="username"
                                        label="用户名"
                                        width="180">
                                    <template slot-scope="scope">
                                        <div @click="callfordeldocker(scope.row.username)" class="teamname">
                                            {{ scope.row.username }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="dockerID"
                                        label="dockerID"
                                        width="360">
                                </el-table-column>
                                <el-table-column
                                        prop="challengename"
                                        label="题目名称"
                                        sortable
                                        width="180">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="SUSrc" name="fourth">
                        <div>
                            <el-table
                                    :data="susrclog"
                                    style="width: 100%"
                                    :default-sort = "{prop: 'time', order: 'descending'}"
                            >
                                <el-table-column
                                        prop="type"
                                        label="类型"
                                        width="180">
                                </el-table-column>

                                <el-table-column
                                        prop="time"
                                        label="提交时间"
                                        sortable
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="description"
                                        label="详细"
                                        >
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="榜单" name="fivith">

                        <div>
                            <el-radio-group v-model="radio" size="medium" @change="changeTheme" fill="#66b1ff">
                            <el-radio-button :label="1">20级新生榜</el-radio-button>
                            <el-radio-button :label="2">总 榜</el-radio-button>
                            </el-radio-group>
                            <el-button @click="export2Excel" type="primary" icon="el-icon-save" >下载</el-button>
                            <el-table
                            id="out-table"
                            stripe
                            border style="margin-bottom:14px;width: 100%;font-size: 20px;"
                            :data="users">
                        <el-table-column
                                property="index"
                                label="排名"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                property="username"
                                label="用户名"
                                width="200">
                            <template slot-scope="scope">
                                <div @click="toteaminfo(scope.row.username)" class="teamname">
                                    {{ scope.row.username }}
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column
                                v-if="showTwenty"
                                property="grade"
                                label="本/研"
                        ></el-table-column>
                        <el-table-column
                                sortable
                                property="pwn"
                                label="Pwn"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                property="web"
                                label="Web"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                property="reverse"
                                label="Reverse"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                property="misc"
                                label="Misc"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                property="crypto"
                                label="Crypto"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                property="userscore"
                                label="战斗力"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                property="email"
                                label="邮箱"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                property="ecard"
                                label="一卡通号"
                        >
                        </el-table-column>
                        <el-table-column
                                sortable
                                property="studentid"
                                label="学号"
                        >
                        </el-table-column>
                    </el-table>
                        </div>
                    </el-tab-pane>

                </el-tabs>

            </div>
        </transition>

        <el-dialog
                title="添加题目"
                :visible.sync="showaddcha"
                width="60%">
            <span>

                <el-form ref="form" :model="addchaform" label-width="80px">
                  <el-form-item label="题目名">
                    <el-input v-model="addchaform.challengename"></el-input>
                  </el-form-item>
                  <el-form-item label="题目类型">
                    <el-select v-model="addchaform.type" placeholder="选择题目类型">
                      <el-option label="pwn" value="pwn"></el-option>
                      <el-option label="web" value="web"></el-option>
                      <el-option label="reverse" value="reverse"></el-option>
                      <el-option label="misc" value="misc"></el-option>
                      <el-option label="crypto" value="crypto"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="题目描述(用html编写会有更好的效果)">
                    <el-input type="textarea" v-model="addchaform.description" rows="7"></el-input>
                  </el-form-item>
                    <el-form-item label="flag">
                    <el-input v-model="addchaform.flag"></el-input>
                  </el-form-item>
                  <el-form-item label="分数">
                    <el-input v-model="addchaform.score"></el-input>
                  </el-form-item>
                  <el-form-item label="虚拟机">
                    <el-switch @change="changeDocVal" on-value=true off-value=false v-model="addchaform.hasDocker"></el-switch>
                  </el-form-item>
                  <el-form-item v-show="addchaform.hasDocker==1" label="动态flag">
                    <el-switch  @change="changeDfVal" on-value=true off-value=false v-model="addchaform.isDynamic"></el-switch>
                  </el-form-item>
                  <el-form-item v-show="addchaform.hasDocker==1" label="镜像名称">
                    <el-input v-model="addchaform.imageName"></el-input>
                  </el-form-item>
                  <el-form-item v-show="addchaform.hasDocker==1" label="端口">
                    <el-input v-model="addchaform.port"></el-input>
                  </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="postaddcha">添 加</el-button>
            </span>
        </el-dialog>


        <el-dialog
                title="删除题目"
                :visible.sync="showdeletecha"
                width="50%">
            <span>
                <el-form ref="form" :model="deletechaform" label-width="80px">
                  <el-form-item label="题目名">
                    <el-input v-model="deletechaform.challengename"></el-input>
                  </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="postdeletecha">删 除</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="删除容器"
                :visible.sync="showdeletedocker"
                width="50%">
            <span>
                <el-form ref="form" :model="deletedockerform" label-width="80px">
                  <el-form-item label="用户名">
                    <el-input v-model="deletedockerform.username"></el-input>
                  </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="postdeletedocker">删 除</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="修改题目"
                :visible.sync="showeditcha"
                width="60%">
            <span>
                <el-form ref="form" :model="editchaform" label-width="80px">
                  <el-form-item label="题目名">
                    <el-input v-model="editchaform.challengename"></el-input>
                  </el-form-item>
                  <el-form-item label="题目类型">
                    <el-select v-model="editchaform.type" placeholder="选择题目类型">
                      <el-option label="pwn" value="pwn"></el-option>
                      <el-option label="web" value="web"></el-option>
                      <el-option label="reverse" value="reverse"></el-option>
                      <el-option label="misc" value="misc"></el-option>
                      <el-option label="crypto" value="crypto"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="题目描述(用html编写会有更好的效果)">
                    <el-input type="textarea" v-model="editchaform.description" rows="7"></el-input>
                  </el-form-item>
                    <el-form-item label="flag">
                    <el-input v-model="editchaform.flag"></el-input>
                  </el-form-item>
                  <el-form-item label="分数">
                    <el-input v-model="editchaform.score"></el-input>
                  </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="posteditcha">修 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    import { Notification } from 'element-ui'
    export default {
        name: "admin",
        data(){
            return{
                showTwenty:false,
                radio: 3,
                showtran:false,
                activeName:"first",
                flaglogs:[],
                userlog:[],
                users:[],
                dockerlogs:[],
                showaddcha:false,
                showdeletecha:false,
                showeditcha:false,
                showdeletedocker:false,
                addchaform:{
                    challengename:'',
                    description:'',
                    type:'',
                    flag:'',
                    score:'',
                    isDynamic:false,
                    hasDocker:false,
                    imageName:'',
                    port:'',
                },
                editchaform:{
                    challengename:'',
                    description:'',
                    type:'pwn',
                    flag:'',
                    score:''
                },
                deletechaform:{
                    challengename:'',

                },
                deletedockerform:{
                    username:'',

                },
                susrclog: [],
            }
        },
        mounted(){
            this.showtran=true
        },
        async beforeCreate() {
            let res=await $axios.get("/getuserlog")
            this.flaglogs=res.data
            let alluser=await $axios.get("/getalluser")
            this.userlog=alluser.data
            let allsrc=await $axios.get("/admingetsrc")
            this.susrclog=allsrc.data
            let alldocker  = await $axios.get("/getdockers")
            this.dockerlogs = alldocker.data
            //console.log(allsrc)
        },
        methods:{
            callfordeldocker(val){
                this.deletedockerform.username = val
                this.showdeletedocker = true
            },
            changeTheme(val) {
                if(val=='1'){
                    this.listTwenty()		
                }else{
                    this.listAll()
                }
      	    },
            changeDfVal(val) {
                this.addchaform.isDynamic=val
            },
            changeDocVal(val) {
                this.addchaform.hasDocker=val
            },
            async listTwenty(){
                let res=await $axios.get("/getscoreboard")
                this.showTwenty = true
                this.total1 = res.data.theTwentyTot
                this.users=res.data.theTwenty
            },
            async listAll(){
                let res=await $axios.get("/getscoreboard")
                this.showTwenty = false
                for(let i in this.userlog){
                    for(let j in res.data.theRet){
                        if(this.userlog[i].username === res.data.theRet[j].username){
                            res.data.theRet[j].email = this.userlog[i].email
                            res.data.theRet[j].ecard = this.userlog[i].ecard
                            res.data.theRet[j].studentid = this.userlog[i].studentid
                        }
                    }
                }
                this.users=res.data.theRet
                this.total1 = res.data.theTot
            },
            export2Excel: function() {
                let tables = document.getElementById("out-table");
                let table_book = this.$XLSX.utils.table_to_book(tables);
                var table_write = this.$XLSX.write(table_book, {
                    bookType: "xlsx",
                    bookSST: true,
                    type: "array"
                });
                try {
                    let FileName=undefined
                    if(this.radio=='1'){
                        FileName="20GradeRes.xlsx"
                    }else{
                        FileName="AllRes.xlsx"
                    }
                    this.$FileSaver.saveAs(
                    new Blob([table_write], { type: "application/octet-stream" }),FileName);
                } catch (e) {
                    if (typeof console !== "undefined") console.log(e, table_write);
                }
                return table_write;
            },
            openmsg(tl,msg) {
                const h = this.$createElement;

                Notification({
                    title: tl,
                    message: h('i', { style: 'color: teal'}, msg)
                });
            },
            openaddcha(){
                this.showaddcha=true
            },
            opendeletecha(){
                this.showdeletecha=true
            },
            opendeletedocker(){
                this.showdeletedocker=true
            },
            openeditcha(){
                this.showeditcha=true
            },
            async postaddcha(){
                this.addchaform.port = Number(this.addchaform.port)
                if(this.addchaform.hasDocker===0){
                    this.addchaform.imageName = this.addchaform.challengename
                }
                let res=await $axios.post("/addchallenge",this.addchaform)
                if(res.data.code===0){
                    this.showaddcha=false
                    this.addchaform={}
                    this.openmsg("通知","添加成功请进行检查")
                }else {
                    this.openmsg("通知",res.data.msg)
                }
            },
            async postdeletecha(){
                let res=await $axios.post("/deletechallenge",this.deletechaform)
                if(res.data.code===0){
                    this.showdeletecha=false
                    this.openmsg("通知","删除成功请进行检查")
                    this.deletechaform={}
                }else {
                    this.openmsg("通知",res.data.msg)

                }
            },
            async postdeletedocker(){
                let res=await $axios.post("/poststopdocker",this.deletedockerform)
                if(res.data.code===0){
                    this.showdeletedocker=false
                    this.openmsg("通知","删除成功请进行检查")
                    this.deletedockerform={}
                }else {
                    this.openmsg("通知",res.data.msg)

                }
            },
            async posteditcha(){
                let res=await $axios.post("/editchallenge",this.editchaform)
                if(res.data.code===0){
                    this.showeditcha=false
                    this.openmsg("通知","修改成功请进行检查")
                }else {
                    this.openmsg("通知",res.data.msg)

                }
            }
        }
    }
</script>

<style scoped>
    i{
        margin: 30px;

    }
    i:hover{
        color: indigo;
        cursor: pointer;
    }
        .el-button {
        font-size: 12px;
        margin: 15px;
    }
    .el-button--primary:focus, .el-button--primary:hover {
        background: #42e165;
        border-color: #42e149;
        color: #FFF;
    }
    .el-radio-group{
        margin: 15px;
    }
</style>
