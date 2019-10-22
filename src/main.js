import Vue from 'vue'
import App from './App.vue'
import router from "./router.js";
import store from "./store.js";
import axios from "./axios.js"
import Element from "element-ui"
import "./assets/index.css"
import "./assets/pure.css"

Vue.use(axios)
Vue.use(Element)

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
