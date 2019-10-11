import Vue from "vue";
import Router from "vue-router";
import login from "./views/login.vue";

import challenge from "./views/challenge.vue";
import scoreboard from "./views/scoreboard.vue";
import usrinfo from "./views/usrinfo.vue";
import usrscore from "./views/usrscore.vue";
import notice from "./views/notice.vue";
import admin from "./views/admin.vue";





Vue.use(Router)

window.$router=new Router({
    mode:'history',
    routes:[

        {
            path:"/login",
            component: login
        },
        {
            path:"/scoreboard",
            component: scoreboard
        },
        {
            path:"/challenge",
            component: challenge
        },
        {
            path:"/usrinfo",
            component: usrinfo
        },
        {
            path:"/usrscore",
            component: usrscore
        },
        {
            path:"/admin",
            component: admin
        },
        {
            path:"/notice",
            component: notice
        },
    ]
})


export default window.$router
