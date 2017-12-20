// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import Store from './Store'

Vue.config.productionTip = false

window.axios = axios
 
window.Store = Store

axios.defaults.headers.common['X-Riot-Token'] = "RGAPI-5b8244fb-9683-4981-8570-6624125f8f0b";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods']= 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers']= 'Origin, Content-Type, X-Auth-Token,X-Riot-Token';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
