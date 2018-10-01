<template>
  <div class="admin-layout">
    <div class="container">
      <h1 class="title layout-title">Dashboard</h1>
      <div class="columns">
        <div class="column is-3">
          <aside class="menu">
            <p class="menu-label">
              General
            </p>
            <ul class="menu-list">
              <li><a class="is-active">Dashboard</a></li>
              <li><a>Log out</a></li>
            </ul>
            <p class="menu-label">
              Articles
            </p>
            <ul class="menu-list">
              <li><a>New article</a></li>
              <li><a>All articles</a></li>
            </ul>
            <p class="menu-label">
              Portfolio
            </p>
            <ul class="menu-list">
              <li><a>New project</a></li>
              <li><a>All projects</a></li>
            </ul>
          </aside>
        </div>
        <transition :name="transitionName">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: null,
      logged: null
    }
  },

  beforeCreate () {
    this.$axios.get('/logged_in')
      .then(response => {
        if (!response.data) {
          this.$router.replace({name: 'login', params: {error: 'not_logged'}})
        }
      })
  }
}
</script>
