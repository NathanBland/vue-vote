<template>
  <div id="">
    <v-container fluid>
      <v-row>
        <v-col xs12 md6 offset-md3>
          <v-card class="blue-grey">
            <v-tabs 
              id="login-form" 
              grow 
              scroll-bars 
              v-bind:model="active"
            >
              <v-tab-item 
                v-bind:href="'#login-form-signup'" 
                ripple
                class="blue-grey darken-2"
                slot="activators"
              >
                Sign Up
              </v-tab-item>
              <v-tab-content
                v-bind:id="'login-form-signup'"
                slot="content"
              >
                <form @submit.prevent="register">
                  <v-card-text class="blue-grey darken-3">
                    <span class="title grey--text text--lighten-1">User Information</span>
                    <v-text-field
                      label="Email"
                      v-model="email"
                      type="email"
                      hint="Must be a valid email address"
                      dark
                      required
                    />
                    <v-text-field
                      label="Display Name"
                      v-model="displayName"
                      type="text"
                      hint="Usually just your name"
                      dark
                      required
                    />
                    <v-text-field
                      label="Password"
                      hint="Should be at least 8 characters"
                      v-model="password"
                      type="password"
                      min="8"
                      dark
                      persistent-hint
                      required
                    />
                    <small class="white--text">*indicates required field</small>
                  </v-card-text>
                  <v-card-row actions class="blue-grey darken-1 mt-0">
                    <v-btn 
                    dark
                    secondary
                    v-bind:loading="loading" 
                    v-on:click.native="loader = 'loading'" 
                    v-bind:disabled="loading"
                    type="submit"
                    >
                      Sign up
                      <span slot="loader">Loading...</span>
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-row>
                </form>
              </v-tab-content>
              <v-tab-item 
                v-bind:href="'#login-form-login'" 
                ripple
                class="blue-grey darken-2"
                slot="activators"
              >
                Login
              </v-tab-item>
              <v-tab-content
                v-bind:id="'login-form-login'"
                slot="content"
              >
                <form @submit.prevent="login">
                  <v-card-text class="blue-grey darken-3">
                    <span class="title grey--text text--lighten-1">Login Information</span>
                    <v-text-field
                      label="Email"
                      v-model="email"
                      type="email"
                      hint="Must be a valid email address"
                      dark
                      required
                    />
                    <v-text-field
                      label="Password"
                      hint="Should be at least 8 characters"
                      v-model="password"
                      type="password"
                      min="8"
                      dark
                      persistent-hint
                      required
                    />
                    <small class="white--text">*indicates required field</small>
                  </v-card-text>
                  <v-card-row actions class="blue-grey darken-1 mt-0">
                    <v-btn 
                    dark
                    secondary
                    v-bind:loading="loading" 
                    v-on:click.native="loader = 'loading'" 
                    v-bind:disabled="loading"
                    type="submit"
                    >
                      Login
                      <span slot="loader">Loading...</span>
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-row>
                </form>
              </v-tab-content>
            </v-tabs>
            
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      displayName: '',
      loading: false,
      active: ''
    }
  },
  mounted (store) {
    this.$emit('view', this.meta())
    this.$store.dispatch('get_api')
  },
  preFetch (store) {
    return this.methods.meta()
  },
  methods: {
    meta () {
      return {
        title: 'vue-vote',
        description: 'Vote on everything',
        keywords: 'vue, vote, events, poll'
      }
    },
    login () {
      this.loading = true
      this.$http.post('auth/login', {
        username: this.email,
        password: this.password
      })
      .then((response) => {
        console.log(response.data)
        this.$store.commit('user/login', response.data)
        this.loading = false
        this.$router.push({ path: 'dashboard' })
      })
      .catch((error) => {
        console.log(error)
        this.loading = false
      })
    },
    register () {
      this.loading = true
      this.$http.post('auth/signup', {
        username: this.email,
        password: this.password,
        displayName: this.displayName
      })
      .then((response) => {
        console.log(response.data)
        this.$store.commit('user/login', response.data)
        this.loading = false
        // this.$http.defaults.headers.common['token'] = response.data.token
        this.$router.push({ path: 'dashboard' })
      })
      .catch((error) => {
        console.log(error)
        this.loading = false
      })
    }
  }
}
</script>