<template>
    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 400px;left: calc(50% - 200px);text-align: center;top:20vh">
            公告
        </div>
        <div class="commoninfo" v-html="notice">

        </div>
    </div>
</template>

<script>
    export default {
        name: "notice",
        data(){
            return {
                notice:''
            }
        },
        async created() {
            console.log(this.$store.state.accessToken)
            let res=await $axios.get("/getnotice")
            this.notice=res.data
        }
    }
</script>

<style scoped>

</style>
