<template>
  <div class="login">
    <form class="form-signin text-center" @submit.prevent="signin">
      <div v-if="error" class="alert alert-danger" role="alert">
        {{ this.error }}. Fucker.
      </div>
      <div v-if="success" class="alert alert-success" role="alert">
        The email was sent.
      </div>
      <img class="mb-4" src="https://placekitten.com/72/72" alt="" width="72" height="72">
      <h3 class="font-weight-normal">Please sign in</h3>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button type="submit" class="btn btn-lg btn-block btn-outline-primary">Login</button>
    </form>

    <div v-if="nb_fails > 0" class="fpmodal">
      <button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#getEmail">
        I forgot my password
      </button>
    </div>

    <div class="modal fade" id="getEmail" tabindex="-1" role="dialog" aria-labelledby="getEmailLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="getEmailLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="retrieveEmail">
          <div class="modal-body">
            <p>
              Overlord will send an email containing a link to reset your password to the email you will enter.
            </p>
            <label for="retrieveMail">Email</label>
            <input type="email" id="retrieveMail" class="form-control" v-model="r_email" required />
          </div>
            <p v-if="not_found" class="text-danger text-center">
              No one there has this email address, mate.
            </p>
            <p v-for="(error, index) in errors" :key="index" class="text-center text-danger">
              {{ error.message }}
            </p>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Send mail</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCookie from '../../settings/VueCookie'
export default {
  name: 'Login',
  metaInfo: {
    title: 'Login | Administration'
  },
  data () {
    return {
      errors: [],
      email: '',
      password: '',
      error: '',
      nb_fails: 0,
      field: '',
      r_email: '',
      not_found: false,
      success: false,
      banned: false
    }
  },

  mounted () {
    this.$axios.post('/check')
      .then(response => {
        if (response.data === 'blocked') {
          this.$router.replace('/')
        }
      })
      .catch(e => {
        console.log(e)
      })
  },

  methods: {
    signin () {
      this.$axios.post('/login', { email: this.email, password: this.password })
        .then(response => {
          VueCookie.set('token', response.data.token)
          VueCookie.set('refresh_token', response.data.refreshToken)
          this.$router.replace({ name: 'Dashboard' })
        })
        .catch(e => {
          VueCookie.delete('refresh_token')
          VueCookie.delete('token')
          this.nb_fails++
          if (this.nb_fails >= 5) {
            this.$axios.post('/blacklist', {})
              .then(() => {
                this.$router.replace('/')
              })
          }
          this.error = e.response.data.error
        })
    },

    retrieveEmail () {
      this.errors = []
      this.$axios.post('/user/reset', { email: this.r_email })
        .then(response => {
          if (response.data === 'ok') {
            $('[data-dismiss=modal]').trigger({ type: 'click' })
            this.r_email = ''
            this.errors = []
            this.success = true
          }
        })
        .catch(e => {
          console.log(e)
          e.response.data.map(error => {
            this.errors.push(error)
          })
        })
    }
  }
}
</script>
