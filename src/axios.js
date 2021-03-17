import Vue from "vue";
import axio from 'axios';
import { Notification } from 'element-ui';

const Axiosp={
    install:(Vue)=>{
        window.$axios=axio.create({
                baseURL : 'http://175.27.138.93:3000/api',  // 后端沟通地址
                // baseURL : 'http://uns3t.cn:3000/api',
                transformResponse: function (data) {
                    function openmsg(tl,msg) {
                        Notification({
                            title: tl,
                            message: msg
                        });
                    }
                    console.log(data)
                    data = JSON.parse(data)

                    // 对 data 进行任意转换处理

                    if(data.msg ==="登陆Token过期，请重新登陆" ){
                        openmsg("通知","登陆Token过期，请重新登陆")
                        window.$store.commit('logout')
                    }
                    if(data.msg ==="401" ){
                        openmsg("通知","用户权限不足,请重新登陆")
                        window.$store.commit('logout')
                    }
                    return data;
                }
            })
        Vue.prototype.$axio=window.$axios
    }
}

export default Axiosp

