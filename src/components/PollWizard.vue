<template>
  <div>
    <v-dialog v-model="createPollDialog" overlay width="500">
      <v-card class="blue-grey darken-3 white--text" slot="activator">
        <v-card-row height="200px">
          <v-card-title>
            Create a new Poll<br/>
            <v-btn icon dark>
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-title>
        </v-card-row>
      </v-card>
      <v-card>
        <v-card-row>
          <v-card-title>Poll Information</v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>
            <v-container fluid>
              <v-text-field label="Question" v-model="question" required hint="what would you like to know? e.g. Apple or Cherry Pie?"/>
              <span v-for="(item, idx) in options">
                <v-chip  v-model="options[idx].valid" close>
                  {{item.option}}
                </v-chip>
              </span>
              <v-text-field label="Option" type="text" @keyup.native.enter="addOption" v-model="option"/><v-btn @click.native="addOption" primary dark>Add option</v-btn>
              
              <small>*indicates required field</small>
            </v-container>
          </v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="blue--text darken-1" flat @click.native="createPollDialog = false">Close</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="createPoll">Create</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="timeout"
      :success="context === 'success'"
      :info="context === 'info'"
      :warning="context === 'warning'"
      :error="context === 'error'"
      :primary="context === 'primary'"
      :secondary="context === 'secondary'"
      :top="true"
      v-model="snackbar"
    >
      <v-icon dark right>check_circle</v-icon>
      Created successfully
      <v-btn class="primary white--text" flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      createPollDialog: false,
      d1: false,
      options: [],
      question: '',
      option: '',
      context: '',
      timeout: 6000,
      snackbar: false
    }
  },
  updated () {
      // this.options = this.options.filter(option => option.valid)
  },
  computed: {
    answers () {
      return this.options.filter(option => option.valid)
    }
  },
  mounted (store) {
  },
  preFetch (store) {
    return this.methods.meta()
  },
  methods: {
    addOption () {
      this.options.push({option: this.option, valid: true})
      this.option = ''
    },
    createPoll () {
      this.loading = true
      this.$http.post('polls', {
        question: this.question,
        options: this.answers,
        token: this.$store.state.user.token
      })
      .then((response) => {
        console.log(response)
        this.loading = false
        this.question = ''
        this.options = []
        this.option = ''
        this.createPollDialog = false
        this.snackbar = true
      })
      .catch((error) => {
        console.log(error)
        this.loading = false
      })
    }
  }
}
</script>