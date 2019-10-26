<template>
    <div>
        <div style="font-size: 40px;color: #f0f0f0;position: absolute;width: 400px;left: calc(50% - 200px);text-align: center;top:20vh">
            公告
        </div>
        <transition name="el-zoom-in-center">
            <div class="commoninfo" v-html="notice" v-show="showtran">

            </div>
        </transition>

    </div>
</template>

<script>
    export default {
        name: "notice",
        data(){
            return {
                notice:'',
                showtran:false
            }
        },
        async beforeCreate() {
            let res=await $axios.get("/getnotice")
            this.notice=res.data.readme
        },
        mounted() {
          this.showtran=true
        }
    }
</script>

<style scoped>

</style>
