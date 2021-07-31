import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/vant.js'
import fetch from './util/fetch'
import api from './util/APIUtil'
import axios from 'axios'
Vue.prototype.$axios = axios


const extend = Vue.prototype
extend.$post = fetch.post
extend.$get = fetch.get
extend.$form = fetch.upload
extend.$upload = fetch.upload2
extend.$api = api
extend.$patch = fetch.patch
extend.$delete = fetch.deletes


Vue.config.productionTip = false


import waterfall from 'vue-waterfall2'
Vue.use(waterfall)


// 引入字体图标文件
require('font-awesome/css/font-awesome.min.css')

// 引入初始化样式表
import '../node_modules/normalize.css/normalize.css'
// 引入全局样式表
import './assets/css/base.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
