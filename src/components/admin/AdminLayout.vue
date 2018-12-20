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
              <router-link to="/admin/messages">
                <i class="fas fa-comment-alt"></i>
                Messages
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <i class="fas fa-home"></i>
                Back to website
              </router-link>
            </li>
            <li class="logout">
              <a @click="logout">
                <i class="fas fa-sign-out-alt fa-flip-horizontal"></i>
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
              <router-link to="/admin/comments">
                <i class="fas fa-comments"></i>
                Comments
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
              <router-link to="/admin/settings">
                <i class="fas fa-cogs"></i>
                Global settings
              </router-link>
            </li>
            <li>
              <router-link to="/admin/user/settings">
                <i class="fas fa-user-cog"></i>
                User settings
              </router-link>
            </li>
            <li>
              <router-link to="/admin/tags">
                <i class="fas fa-tag"></i>
                Manage tags
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <div id="content">
      <div class="container">
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
                  v-for="(element, index) in breadcrumb"
                  :key="index"
                  :class="[(index + 1) === breadcrumb.length ? 'active' : '']"
                >
                  <a v-if="(index + 1) === breadcrumb.length">{{ element }}</a>
                  <router-link v-else :to="{name: element}">{{ element }}</router-link>
                </li>
              </ol>
            </nav>

          </div>
        </nav>

        <h2>{{ pageTitle }}</h2>

        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import VueCookie from '../../settings/VueCookie'
export default {
  data () {
    return {
      transitionName: null,
      logged: null,
      pageTitle: 'Dashboard',
      breadcrumb: ['Dashboard', 'Portfolio', 'This incredible website']
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

  methods: {
    logout () {
      const refreshToken = VueCookie.get('refresh_token')
      this.$axios.post('/logout', {refresh_token: refreshToken})
        .then(() => {
          VueCookie.delete('refresh_token')
          VueCookie.delete('token')
          this.$router.replace({name: 'Landing'})
        })
    },

    setTitle (value) {
      document.title = `Administration | ${value}`
      this.pageTitle = value
    },

    setBreadcrumb (elements) {
      this.breadcrumb = []
      if (Array.isArray(elements)) {
        elements.map(element => {
          this.breadcrumb.push(element)
        })
      } else {
        this.breadcrumb.push(elements)
      }
    }
  },

  mounted () {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active')
      $(this).toggleClass('active')
    })
  }
}
</script>
