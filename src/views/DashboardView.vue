<template>
  <div>
    <v-container>
      <v-row>
        <v-col xs12 md4>
          <poll-wizard></poll-wizard>
        </v-col>
        <v-col xs12 md4>
          <v-card class="blue-grey darken-2 white--text">
            <v-card-row height="200px">
              <v-card-title>
                Existing pollsssss
              </v-card-title>
            </v-card-row>
          </v-card>
        </v-col>
        <v-col xs12 md4>
          <v-card class="blue-grey darken-2 white--text">
            <v-card-row height="200px">
              <v-card-title>
                Existing pollsssss
              </v-card-title>
            </v-card-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PollWizard from '../components/PollWizard'
export default {
  data () {
    return {
    }
  },
  components: {
    PollWizard
  },
  mounted (store) {
  },
  preFetch (store) {
    return this.methods.meta()
  },
  methods: {
    meta () {
      return {
        title: 'vue-vote | Dashboard',
        description: 'Vote on everything',
        keywords: 'vue, vote, events, poll'
      }
    }
  }
}
</script>