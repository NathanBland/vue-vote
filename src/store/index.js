import Vue from 'vue'
import Vuex from 'vuex'
import {instance} from '../app'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'vue-vote',
    description: null,
    keywords: null,
    application: {
      connected: false
    },
    user: {
      username: '',
      token: '',
      loggedIn: false
    }
  },

  actions: {
    get_api ({ commit, dispatch, state }) {
      // console.log('this:', this)
      instance.get('/', {
      })
      .then((response) => {
        // console.log('res:', response)
        if (response.status === 200) {
          commit('application/connected', true)
          commit('vuetify/TITLE', 'got data')
        }
      })
      .catch((error) => {
        console.log('err', error)
      })
    }
  },

  mutations: {
    'user/login' (state, payload) {
      state.user.username = payload.username
      state.user.token = payload.token
      state.user.loggedIn = true
    },
    'application/connected' (state, payload) {
      state.application.connected = payload
    },
    'vuetify/TITLE' (state, payload) {
      state.title = payload
      document.title = title
    },

    'vuetify/DESCRIPTION' (state, payload) {
      state.description = payload
      document.head.querySelector('meta[name=description]').content = description
    },

    'vuetify/KEYWORDS' (state, payload) {
      state.keywords = payload
      document.head.querySelector('meta[name=keywords]').content = keywords
    }
  }
})