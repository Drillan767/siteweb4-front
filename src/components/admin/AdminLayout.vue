<template>
  <div class="admin-layout">
    <h1>Admin Layouuuuuut</h1>
    <div class="tabs is-centered is-boxed">
      <ul>
        <li class="is-active">
          <a>
            <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span>
            <span>Pictures</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span>
            <span>Music</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span>
            <span>Videos</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small"><i class="far fa-file-alt" aria-hidden="true"></i></span>
            <span>Documents</span>
          </a>
        </li>
      </ul>
    </div>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
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
          this.$router.replace({ name: 'login', params: { error: 'not_logged' } })
        }
      })
  }
}
</script>
