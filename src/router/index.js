import Vue from 'vue'
import Router from 'vue-router'

import GetStartedView from '../views/GetStartedView.vue'
import PollView from '../views/PollView.vue'
import DashboardView from '../views/DashboardView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: GetStartedView },
    { path: '/poll', 
      component: PollView, 
      meta: { requiresAuth: true }
    },
    { path: '/dashboard', 
      component: DashboardView, 
      meta: { requiresAuth: true }
    }
  ]
})