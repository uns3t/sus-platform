<template>
    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 400px;left: calc(50% - 200px);text-align: center;top:20vh">
            得分记录
        </div>
        <transition name="el-zoom-in-center">
            <div class="commoninfo" v-show="showtran">
                <div style="width: 300px;height: 400px;padding: 30px;display: inline-block;float: left;margin-right: 50vh">
                    <div style="font-size: 25px;">{{username}}</div>
                    <div style="font-size: 13px;color: #8c939d">{{"在排行榜中位于第 "+userRank+" 名"}}</div>
                </div>
                <div id="echartsUse" style="width: 500px;height: 500px;display: inline-block;float: left;margin-top: 40px"></div>

                <div>
                    <el-table
                            :data="challengelog"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                prop="challengename"
                                label="题目"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="分类"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="solvedscore"
                                label="分数"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="issolved"
                                label="是否解决"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="submittime"
                                label="提交时间">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </transition>

    </div>

</template>

<script>
    import echarts from "echarts"

    export default {

        name: "teaminfo",
        data(){
            return{
                userRank:1,
                challengelog:[],
                echartsdata:{},
                showtran:false,
                username: ""
            }
        },
        computed:{
            userName(){
                return this.$store.state.userInfo.username
            },

        },
        methods:{
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 == 1) {
                    return 'row1';
                } else {
                    return 'row0';
                }

            }
        },
        async created(){

        },
        async mounted(){

            let res={}

            console.log(window.teamname)
            this.username=window.teamname
            res=await $axios.post("/postuserscore",{username:window.teamname})



            console.log(res)
            this.userRank=res.data.rank
            this.challengelog=res.data.challengelog
            this.echartsdata=res.data.echartdata
            var myChart = echarts.init(document.getElementById('echartsUse'));
            console.log(this.echartsdata)

            myChart.setOption({
                title: {
                    text: '题目完成情况'
                },
                tooltip: {},
                legend: {
                    data: ['完成进度']
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [
                        { name: 'pwn', max: this.echartsdata.pwn[1]},
                        { name: 're', max: this.echartsdata.re[1]},
                        { name: 'web', max: this.echartsdata.web[1]},
                        { name: 'misc', max: this.echartsdata.misc[1]},
                        { name: 'crypto', max: this.echartsdata.crypto[1]},

                    ]
                },
                series: [{
                    name: '题目完成情况',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data : [

                        {
                            value : [this.echartsdata.pwn[0], this.echartsdata.re[0], this.echartsdata.web[0], this.echartsdata.misc[0], this.echartsdata.crypto[0]],
                            name : '完成进度'
                        },
                    ]
                }]
            })
            this.showtran=true
            window.teamname=undefined
        },
    }
</script>

<style scoped>

</style>
<style>
    .el-table .row0 {
        background: #ffffff;
    }

    .el-table .row1 {
        background: #f0f0f0;
    }
</style>


