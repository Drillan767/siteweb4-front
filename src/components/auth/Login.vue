<template>
  <div class="login">
    <form class="form-signin text-center" @submit.prevent="signin">
      <img class="mb-4" src="https://placekitten.com/72/72" alt="" width="72" height="72">
      <h3 class="font-weight-normal">Please sign in</h3>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button type="submit" class="btn btn-lg btn-block btn-outline-primary">Login</button>
    </form>
  </div>
</template>

<script>
export default {

  data () {
    return {
      email: '',
      password: '',
      error: []
    }
  },

  created () {
    this.$axios.get('/logged_in')
      .then(response => {
        if (response.data) {
          this.$router.replace({ name: 'admin' })
        }
      })
  },

  methods: {
    signin () {
      this.$axios.post('/login', {email: this.email, password: this.password})
        .then(response => {
          if (response.status === 200) {
            this.$router.replace({ name: 'admin' })
          }
        })
    }
  }

}
</script>
