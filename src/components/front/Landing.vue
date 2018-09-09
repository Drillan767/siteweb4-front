<template>
  <div class="landing">
    <h1>Bonjour</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: null
    }
  },

  created () {
    this.$axios.get('/user')
      .then(response => {
        this.user = response.data
        console.log(response)
      })
  }
}
</script>
