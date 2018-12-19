// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import Meta from 'vue-meta'
import VueAxios from 'vue-axios'
import AxiosConfig from './settings/client'
import router from './router'
import VueI18n from 'vue-i18n'
import messages from './locale/locale'
import 'bootstrap'
import '@fancyapps/fancybox/dist/jquery.fancybox.min.js'
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css'
import './assets/style.scss'

Vue.prototype.$axios = Axios.create(AxiosConfig)
Vue.config.productionTip = false
Vue.use(VueAxios, Axios)
Vue.use(VueI18n)
Vue.use(Meta)

const i18n = new VueI18n({
  locale: 'fr',
  messages: messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
