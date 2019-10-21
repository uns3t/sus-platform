import Vue from "vue";
import axio from 'axios';

const Axiosp={
    install:(Vue)=>{
        window.$axios=axio.create({
                baseURL : 'http://localhost:3000/api',
                // transformResponse: function (status) {
                //     console.log(status)
                //     // 对 data 进行任意转换处理
                //
                //     if(status === 401){
                //         window.$store.commit('logout')
                //     }
                //     return ;
                // }
            })
        Vue.prototype.$axio=window.$axios
    }
}

export default Axiosp

