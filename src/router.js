import Vue from "vue";
import Router from "vue-router";
import login from "./views/login.vue";
import store from "./store.js";

import challenge from "./views/challenge.vue";
import scoreboard from "./views/scoreboard.vue";
import usrinfo from "./views/usrinfo.vue";
import usrscore from "./views/usrscore.vue";
import notice from "./views/notice.vue";
import admin from "./views/admin.vue";
import page404 from "./views/page404.vue";
import teaminfo from "./views/teaminfo";





Vue.use(Router)

window.$router=new Router({
    mode:'history',
    routes:[
        {
            path:"/",
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
        {
            path:"/teaminfo",
            component: teaminfo
        },
        {
            path:'*',
            component:page404
        }
    ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

window.$router.beforeEach((to, from, next) => {
    if(!store.state.isLogin&&to.path!="/"){
        next({path:"/"})
    }else {
        next()
    }
})

// window.$router=router

export default window.$router
