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
                                    :default-sort = "{prop: 'userscore', order: 'descending'}"
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
                                <el-table-column
                                        prop="userscore"
                                        label="分数"
                                        sortable>
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
                      <el-option label="reserve" value="reserve"></el-option>
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
                      <el-option label="reserve" value="reserve"></el-option>
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
    import { Notification } from 'element-ui'
    export default {
        name: "admin",
        data(){
            return{
                showtran:false,
                activeName:"first",
                flaglogs:[],
                userlog:[],
                showaddcha:false,
                showdeletecha:false,
                showeditcha:false,
                addchaform:{
                    challengename:'',
                    description:'',
                    type:'pwn',
                    flag:'',
                    score:''
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

                }

            }
        },
        mounted(){
            this.showtran=true
        },
        async beforeCreate() {
            let res=await $axios.get("/getuserlog")
            console.log(res)
            this.flaglogs=res.data
            let alluser=await $axios.get("/getalluser")
            this.userlog=alluser.data
            console.log(this.userlog)
        },
        methods:{
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
            openeditcha(){
                this.showeditcha=true
            },
            async postaddcha(){
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
</style>
