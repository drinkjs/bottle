import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import './samples/node-api'
import router from "./router"

createApp(App)
  .use(Antd)
  // .use(router)
  .mount('#app')
  .$nextTick(window.removeLoading)
