<template>
    <div class="notfound">
        <div class="text404">
            访 问 了 个 寂 寞
        </div>
    </div>
</template>

<script>
    export default {
        name: "page404"
    }
</script>

<style scoped>
    .notfound{
        position: relative;
        z-index: 10;
        height: 100vh;
        background-image: url(../assets/image/bg4.jpg);
        background-repeat: repeat;
        background-size: cover;
        background-position: center;
    }
    .text404{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate( -50% , -50% );
        color: #f0f0f0;
        font-size: 30px;
    }
</style>
