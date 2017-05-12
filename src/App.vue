<template>
  <v-app top-toolbar>
    <header>
      <v-toolbar class="blue-grey darken-2">
        <v-toolbar-logo>vue-vote</v-toolbar-logo>
        <v-toolbar-items>
          <v-toolbar-item>
            
          </v-toolbar-item>
        </v-toolbar-items>
      </v-toolbar>
    </header>

    <main>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      view (meta) {       
        this.$store.commit('vuetify/TITLE', meta.title)
        this.$store.commit('vuetify/DESCRIPTION', meta.description)
        this.$store.commit('vuetify/KEYWORDS', meta.keywords)
      }
    }
  }
</script>
