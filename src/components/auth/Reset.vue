<template>
  <div class="reset">
    <div class="alert alert-danger" v-if="errors.length > 0">
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error.message }}
        </li>
      </ul>
    </div>
    <form @submit.prevent="reset" class="form-reset text-center">
      <div class="form-group">
        <h3>Change your password</h3>
        <div class="form-group">
          <label for="password" hidden>New password</label>
          <input type="password" id="password" class="form-control" placeholder="New password" v-model="password" required>
        </div>
       <div class="form-group">
         <label for="r_password" hidden>Repeat password</label>
         <input type="password" id="r_password" class="form-control" placeholder="Repeat password" v-model="r_password" required />
       </div>
        <button class="btn btn btn-outline-secondary">Change password</button>
      </div>
    </form>
  </div>
</template>

<script>
import VueCookie from '../../settings/VueCookie'
export default {
  metaInfo: {
    title: 'Reset password | Administration'
  },

  data () {
    return {
      password: '',
      r_password: '',
      errors: []
    }
  },

  mounted () {
    const hash = this.$router.history.current.params.token
    this.$axios.post('/user/reset/token', { hash: hash })
      .catch(e => {
        if (e.response.data === 'no') {
          this.$router.replace('/')
        }
      })
  },

  methods: {
    reset () {
      this.errors = []
      if (this.password !== this.r_password) {
        this.errors.push({ message: "Passwords don't match" })
      }
      if (this.password.length < 8) {
        this.errors.push({ message: 'Your password should contain at least 8 characters' })
      }

      if (this.errors.length === 0) {
        const hash = this.$router.history.current.params.token
        this.$axios.post('/user/reset/password', { password: this.password, hash: hash })
          .then(response => {
            VueCookie.delete('token')
            VueCookie.delete('refresh_token')
            VueCookie.set('token', response.data.token)
            VueCookie.set('refresh_token', response.data.refreshToken)
            this.$router.replace('/admin?reset=1')
          })
          .catch(e => {
            console.log(e.response)
          })
      }
    }
  }
}
</script>
