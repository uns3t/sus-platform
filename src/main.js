import Vue from 'vue'
import App from './App.vue'
import router from "./router.js";
import store from "./store.js";
import axios from "./axios.js"
// import Element from "element-ui"
import {
    Dialog,
  Input,
  Switch,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Divider,
        } from "element-ui"
import "./assets/index.css"
import "./assets/pure.css"

Vue.use(axios)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Button)
Vue.use(Divider)




Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
