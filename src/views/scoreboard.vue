<template>

    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 400px;left: calc(50% - 200px);text-align: center;top:20vh">
            排行榜
        </div>
        
        <transition name="el-zoom-in-center">
            <div class="commoninfo" v-show="showtran">
            <div style="border: 10px;border-width: 10px;">
                <el-radio-group v-model="radio" size="medium" @change="changeTheme" fill="#66b1ff">
                    <el-radio-button :label="1">20级本科生榜</el-radio-button>
                    <el-radio-button :label="2">20级研究生榜</el-radio-button>
                    <el-radio-button :label="3">总 榜</el-radio-button>
                </el-radio-group>
                <el-button @click="export2Excel" type="primary" icon="el-icon-save" v-if="showDownload">下载</el-button>
            </div>
                <div style="text-align: center">
                 
                    <el-table
                            id="out-table"
                            stripe
                            border style="margin-bottom:14px;width: 100%;font-size: 20px;"
                            :data="fyusers">
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
                                sortable
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
                                property="reserve"
                                label="Reserve"
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
                    </el-table>
                    <el-pagination
                    @size-change="handlesizechange1"
                    @current-change="handlecurrentchange1" :current-page="currentpage1"
                    :page-sizes="[10, 20, 50, 100,500]"
                    :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
                    :total="total1">
                    </el-pagination>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
    export default {
        name: "scoreboard",
        data(){
            return {
                showDownload: false,
                showTwenty:false,
                showtran:false,
                users:[],
                total1: 0,
                currentpage1: 1,
                pagesize:10,
                fyusers: [],
		        radio: 3,
            }
        },
        mounted(){
            this.showtran=true
        },
        async beforeCreate() {
            let res=await $axios.get("/getscoreboard")
            this.users=res.data.theRet
            this.total1 = res.data.theTot
            let from = (this.currentpage1 - 1) * this.pagesize
            let to = this.currentpage1 * this.pagesize
            this.fyusers = []
            for (; from < to; from++) {
                if (this.users[from]) {
                   // console.log(this.users[from])
                    this.fyusers.push(this.users[from]);
                }
            }
        },
        methods:{
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
            toteaminfo(teamname){
                window.teamname=teamname
                window.$router.replace("/teaminfo")
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 == 1) {
                    return 'Odd-row';
                } else {
                    return 'Even-row';
                }
                return '';
            },
            handlesizechange1: function(pagesize) { // 每页条数切换
                this.pagesize = pagesize
                this.handlecurrentchange1(this.currentpage1);
            },
            handlecurrentchange1: function(currentpage) {//页码切换
                this.currentpage1 = currentpage
                this.currentchangepage(this.users,currentpage)
                
            },
            changeTheme(val) {
                if(val=='1'){
                    this.listTwentyA()		
                }else if(val=='3'){
                    this.listAll()
                }else {
                    this.listTwentyB()
                }
      	    },
            async listTwentyA(){
                let res=await $axios.get("/getscoreboard")
                this.showTwenty = true
                this.total1 = res.data.theTwentyTotA
                this.users=res.data.theTwentyA
                let from = (this.currentpage1 - 1) * this.pagesize
                let to = this.currentpage1 * this.pagesize
                this.fyusers = []
                for (; from < to; from++) {
                    if (this.users[from]) {
                       console.log(this.users[from])
                          this.fyusers.push(this.users[from]);
                    }
                }
            },
            async listTwentyB(){
                let res=await $axios.get("/getscoreboard")
                this.showTwenty = true
                this.total1 = res.data.theTwentyTotB
                this.users=res.data.theTwentyB
                let from = (this.currentpage1 - 1) * this.pagesize
                let to = this.currentpage1 * this.pagesize
                this.fyusers = []
                for (; from < to; from++) {
                    if (this.users[from]) {
                       console.log(this.users[from]) 
                        this.fyusers.push(this.users[from]);
                    }
                }
            },
            async listAll(){
                let res=await $axios.get("/getscoreboard")
                this.showTwenty = false
                this.users=res.data.theRet
                this.total1 = res.data.theTot
                let from = (this.currentpage1 - 1) * this.pagesize
                let to = this.currentpage1 * this.pagesize
                this.fyusers = []
                for (; from < to; from++) {
                    if (this.users[from]) {
                        //console.log(this.users[from])
                        this.fyusers.push(this.users[from]);
                    }
                }
            },
            //分页方法（重点）
            currentchangepage(list,currentpage) {
                let from = (currentpage - 1) * this.pagesize;
                let to = currentpage * this.pagesize;
                this.fyusers = [];
                for (; from < to; from++) {
                    if (list[from]) {
                        this.users[from].index = from+1
                      this.fyusers.push(list[from]);
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .teamname:hover{
        cursor: pointer;
    }

</style>
<style>
    .el-table .Odd-row {
        background: #ffffff;
    }
    .el-pager li{
        font-size: 18px;
    }
    .el-table .Even-row {
        background: #f0f0f0;
    }
    .el-pagination button, .el-pagination span:not([class*="suffix"]){
        font-size: 20px;
    }
    .el-pagination .el-select .el-input .el-input__inner{
        font-size: 18px;
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
