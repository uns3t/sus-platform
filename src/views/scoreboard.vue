<template>
    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 400px;left: calc(50% - 200px);text-align: center;top:20vh">
            排行榜
        </div>
        <div class="commoninfo">
            <div style="text-align: center">

                <el-table
                        :data='users'
                        style="width: 100%"
                        :row-class-name="tableRowClassName">
                    <el-table-column
                            type="index"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            label="用户名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="userscore"
                            label="分数"
                            >
                    </el-table-column>

                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "scoreboard",
        data(){
            return {
                users:[]
            }
        },
        async beforeCreate() {
            let res=await $axios.get("/getscoreboard")
            this.users=res.data
            console.log(this.users)
        },
        methods:{
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 == 1) {
                    return 'Odd-row';
                } else {
                    return 'Even-row';
                }
                return '';
            }
        }
    }
</script>

<style scoped>

</style>
<style>
    .el-table .Odd-row {
        background: #ffffff;
    }

    .el-table .Even-row {
        background: #f0f0f0;
    }
</style>
