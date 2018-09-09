// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import AxiosConfig from './settings/client'
import i18n from './locale/i18n'
import router from './router'

import './assets/style.scss'

Vue.prototype.$axios = Axios.create(AxiosConfig)
Vue.config.productionTip = false
Vue.use(VueAxios, Axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
