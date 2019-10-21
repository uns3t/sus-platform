<template>
    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 400px;left: calc(50% - 200px);text-align: center;top:20vh">
            管理
        </div>
        <div class="commoninfo">
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
                <el-tab-pane label="用户管理" name="third">角色管理</el-tab-pane>

            </el-tabs>



<!--            分页功能还未完成-->

        </div>
        <el-dialog
                title="添加题目"
                :visible.sync="showaddcha"
                width="60%">
            <span><div style="box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);padding: 20px;margin-left: 10px;margin-right: 10px">
                <el-form ref="form" :model="addchaform" label-width="80px">
                  <el-form-item label="题目名">
                    <el-input v-model="addchaform.name"></el-input>
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
            </div></span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="postaddcha">添 加</el-button>
            </span>
        </el-dialog>


        <el-dialog
                title="删除题目"
                :visible.sync="showdeletecha"
                width="60%">
            <span><div style="box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);padding: 20px;margin-left: 10px;margin-right: 10px">
                <el-form ref="form" :model="deletechaform" label-width="80px">
                  <el-form-item label="题目名">
                    <el-input v-model="deletechaform.name"></el-input>
                  </el-form-item>
                </el-form>
            </div></span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="postdeletecha">删 除</el-button>
            </span>
        </el-dialog>


        <el-dialog
                title="修改题目"
                :visible.sync="showeditcha"
                width="60%">
            <span><div style="box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);padding: 20px;margin-left: 10px;margin-right: 10px">
                <el-form ref="form" :model="editchaform" label-width="80px">
                  <el-form-item label="题目名">
                    <el-input v-model="editchaform.name"></el-input>
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
            </div></span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="posteditcha">修 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "admin",
        data(){
            return{
                activeName:"first",
                flaglogs:[],
                showaddcha:false,
                showdeletecha:false,
                showeditcha:false,
                addchaform:{},
                editchaform:{},
                deletechaform:{}

            }
        },
        async beforeCreate() {
            let res=await $axios.get("/getuserlog")
            console.log(res)
            this.flaglogs=res.data
        },
        methods:{
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
                if(res.data.code===1){
                    this.showaddcha=false
                    alert("添加成功")
                }
            },
            async postdeletecha(){
                let res=await $axios.post("/deletechallenge",this.deletechaform)
                if(res.data.code===1){
                    this.showdeletecha=false
                    alert("删除成功")
                }
            },
            async posteditcha(){
                let res=await $axios.post("/editchallenge",this.editchaform)
                if(res.data.code===1){
                    this.showeditcha=false
                    alert("修改成功")
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
