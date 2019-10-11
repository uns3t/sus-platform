<template>
    <div>
        <div style="font-size: 25px;font-weight: bold;text-align: center;padding: 20px">
            题库
        </div>
        <div class="block-challenge">
<!--            <el-divider content-position="left">pwn</el-divider>-->
            <div class="detail-challenge">
                <span style="float: left"><i class="el-icon-circle-check"></i></span>
                <br/>
                <div style="font-size: 30px;display: inline-block">level</div>
                <br/>
                <br/>
                <div style="font-size: 13px;">1000分 25解出/31提交</div>
            </div>



        </div>
    </div>
</template>

<script>
    export default {
        name: "challenge"
    }
</script>

<style scoped>
    .block-challenge{
        margin: 10px 8% 10px 8%;
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
