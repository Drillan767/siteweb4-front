<template>
  <div class="login">
    <form class="form-signin text-center" @submit.prevent="signin">
      <img class="mb-4" src="https://placekitten.com/72/72" alt="" width="72" height="72">
      <h3 class="font-weight-normal">Please sign in</h3>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" v-model="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" v-model="remember_me"> Remember me
        </label>
      </div>
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
      remember_me: 0,
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
      this.$axios.post('/login', {email: this.email, password: this.password, remember_me: this.remember_me})
        .then(response => console.log(response))
    }
  }

}
</script>

<style>
  .hero.is-success {
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>
