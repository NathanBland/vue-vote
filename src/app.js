import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import store from './store/index'
import router from './router/index'
import axios from 'axios'
import { sync } from 'vuex-router-sync'

sync(store, router)

let instance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
Vue.prototype.$http = instance

Vue.use(Vuetify)

const app = new Vue(Vue.util.extend({
  router,
  store
}, App))

export { app, router, store, instance }
