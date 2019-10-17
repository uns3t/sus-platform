import Vue from "vue";
import axio from 'axios';

const Axiosp={
    install:(Vue)=>{
        window.$axios=axio.create({
                baseURL : 'http://localhost:3000/api',

            })
        Vue.prototype.$axio=window.$axios
    }
}

export default Axiosp

