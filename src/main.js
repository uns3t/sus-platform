import Vue from 'vue'
import App from './App.vue'
import router from "./router.js";
import axios from "./axios.js"
import Element from "element-ui"
import "./assets/index.css"
import "./assets/pure.css"

Vue.use(axios)
Vue.use(Element)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
