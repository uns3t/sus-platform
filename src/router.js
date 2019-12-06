import Vue from "vue";
import Router from "vue-router";
import login from "./views/login.vue";
import store from "./store.js";
import usrinfo from "./views/usrinfo.vue";
import usrscore from "./views/usrscore.vue";
import notice from "./views/notice.vue";
import admin from "./views/admin.vue";
import page404 from "./views/page404.vue";
import teaminfo from "./views/teaminfo";
import susrc from "./views/susrc";




Vue.use(Router)

window.$router=new Router({
    mode:'history',
    routes:[
        {
            path:"/",
            component: resolve => require(['./views/login.vue'], resolve),
        },
        {
            path:"/scoreboard",
            component: resolve => require(['./views/scoreboard.vue'], resolve),

        },
        {
            path:"/challenge",
            component: resolve => require(['./views/challenge.vue'], resolve),
        },
        {
            path:"/usrinfo",
            component: resolve => require(['./views/usrinfo.vue'], resolve),
        },
        {
            path:"/usrscore",
            component: resolve => require(['./views/usrscore.vue'], resolve),
        },
        {
            path:"/admin",
            component: resolve => require(['./views/admin.vue'], resolve),
        },
        {
            path:"/notice",
            component: resolve => require(['./views/notice.vue'], resolve),
        },
        {
            path:"/teaminfo",
            component: resolve => require(['./views/teaminfo.vue'], resolve),
        },
        {
            path:"/susrc",
            component: resolve => require(['./views/susrc.vue'], resolve),
        },
        {
            path:'*',
            component:resolve => require(['./views/page404.vue'], resolve),
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


export default window.$router
