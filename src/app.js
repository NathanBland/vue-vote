import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import store from './store/index'
import router from './router/index'
import axios from 'axios'
import { sync } from 'vuex-router-sync'

sync(store, router)

let instance = axios.create({
  baseURL: 'https://0f437d4f.ngrok.io/api/',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
Vue.prototype.$http = instance

Vue.use(Vuetify)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.user.loggedIn) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

const app = new Vue(Vue.util.extend({
  router,
  store
}, App))

export { app, router, store, instance }
