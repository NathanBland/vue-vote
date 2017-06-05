<template>
  <div id="">
    <v-container fluid>
      <v-row>
        <v-col xs12 md6 offset-md3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted (store) {
  },
  preFetch (store) {
    return this.methods.meta()
  },
  methods: {
    meta () {
      return {
        title: 'vue-vote | Poll',
        description: 'Vote on everything',
        keywords: 'vue, vote, events, poll'
      }
    }
  }
}
</script>