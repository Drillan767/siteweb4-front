<template>
  <div class="admin-layout wrapper">
    <nav id="sidebar">
      <ul class="list-unstyled components">
        <li class="active">
          <ul class="list-unstyled" id="homeSubmenu">
            <li>
              <span>
                General
              </span>
            </li>
            <li>
              <router-link to="/admin">
                <i class="fas fa-tachometer-alt"></i>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <i class="fas fa-home"></i>
                Back to website
              </router-link>
            </li>
            <li>
              <a @click="logout">
                <i class="fas fa-exit"></i>
                Logout
              </a>
            </li>
            <li>
              <span>
                Articles
              </span>
            </li>
            <li>
              <router-link to="/admin/article/new">
                <i class="far fa-plus-square"></i>
                New article
              </router-link>
            </li>
            <li>
              <router-link to="/admin/articles">
                <i class="fas fa-th-list"></i>
                All articles
              </router-link>
            </li>
            <li>
              <span>
                Portfolio
              </span>
            </li>
            <li>
              <router-link to="/admin/project/new">
                <i class="far fa-plus-square"></i>
                New project
              </router-link>
            </li>
            <li>
              <router-link to="/admin/portfolio">
                <i class="fas fa-th-list"></i>
                All projects
              </router-link>
            </li>
            <li>
              <span>
                Settings
              </span>
            </li>
            <li>
              <router-link to="/admin/portfolio">
                <i class="fas fa-th-list"></i>
                Edit settings
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <div id="content">

      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">

          <button type="button" id="sidebarCollapse" class="navbar-btn">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li
                class="breadcrumb-item"
                v-for="(element, index) in this.$route.meta.breadcrumb"
                :key="index"
                :class="[index === last ? 'active' : '']"
              >
                <router-link v-if="index !== last" :to="{name: element}">{{ element }}</router-link>
                <a v-else>{{ element }}</a>
              </li>
            </ol>
          </nav>

        </div>
      </nav>

      <h2>{{ pageTitle }}</h2>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import VueCookie from '../../settings/VueCookie'
export default {
  data () {
    return {
      transitionName: null,
      logged: null,
      pageTitle: 'Dashboard',
      breadcrumb: []
    }
  },

  beforeCreate () {
    const refreshToken = VueCookie.get('refresh_token')
    this.$axios.post('/user/token/refresh', {refresh_token: refreshToken})
      .then(response => {
        VueCookie.set('token', response.data.token)
        VueCookie.set('refresh_token', response.data.refreshToken)
      })
      .catch(e => {
        VueCookie.delete('refresh_token')
        VueCookie.delete('token')
        this.$router.replace({name: 'login', params: {error: 'not_logged'}})
      })
  },

  watch: {
    $route (to, from) {
      // console.log(from)
      // console.log(to)
      this.pageTitle = to.meta.title
    }
  },

  methods: {
    logout () {
      const refreshToken = VueCookie.get('refresh_token')
      this.$axios.post('/logout', {refresh_token: refreshToken})
        .then(response => {
          VueCookie.delete('refresh_token')
          VueCookie.delete('token')
          this.$router.replace({name: 'Home'})
        })
    }
  },

  mounted () {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active')
      $(this).toggleClass('active')
    })
  },

  computed: {
    last () {
      return Object.keys(this.$route.meta.breadcrumb).length - 1
    }
  }
}
</script>
