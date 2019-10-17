import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// const vuexLocal = new VuexPersistence({
//     storage: window.localStorage
// })

Vue.use(Vuex)   //显式引入vuex

window.$store = new Vuex.Store({
    // plugins:[vuexLocal.plugin],
    state: {
        isLogin:false,
        // userInfo:{},
        // accessToken:'',
        // currentRouteName:''

    },
    mutations: {
        // , accessToken
        login(state){
            state.isLogin = true
            // Vue.prototype.$axios.defaults.headers.common['Access-Token'] = accessToken
            // state.accessToken = accessToken
        },
        logout(state){
            state.isLogin = false,
                // Vue.prototype.$axios.defaults.headers.common['Access-Token'] = ''
            // state.accessToken = ''
            window.$router.replace({name:'login'})
        },
        userInfo(state, userInfo){
            state.userInfo = userInfo
        },
        resetPassword(state){
            state.isLogin = false,
                // Vue.prototype.$axios.defaults.headers.common['Access-Token'] = ''
            // state.accessToken = ''
            window.$router.replace({name:'forget-password'})
        },
        setCurrentRouteName(state, routeName){
            let { to } = routeName
            state.currentRouteName = to.meta.displayName
        },

    },
    actions: {

    }
})

export default window.$store
