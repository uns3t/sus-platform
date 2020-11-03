import Vue from 'vue'
import App from './App.vue'
import router from "./router.js";
import store from "./store.js";
import axios from "./axios.js";
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

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
  Pagination,
	RadioButton,
	RadioGroup
        } from "element-ui"

import "./assets/index.css"
import "./assets/pure.css"


Vue.use(Pagination)
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
Vue.use(RadioButton)
Vue.use(RadioGroup)

Vue.config.productionTip = false

Vue.prototype.$FileSaver = FileSaver;
Vue.prototype.$XLSX = XLSX;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
