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
          </ul>
        </li>
      </ul>
    </nav>

    <div id="content">

      <h3>{{ pageTitle }}</h3>

      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">

          <button type="button" id="sidebarCollapse" class="navbar-btn">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item" v-for="(element, index) in this.$route.meta.breadcrumb" :key="index" :class="[index === last ? 'active' : '']">
                <router-link v-if="index !== last" :to="{name: element}">{{ element }}</router-link>
                <a v-else>{{ element }}</a>
              </li>
            </ol>
          </nav>

        </div>
      </nav>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
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
    this.$axios.get('/logged_in')
      .then(response => {
        if (!response.data) {
          this.$router.replace({name: 'login', params: {error: 'not_logged'}})
        }
      })
  },

  watch: {
    $route (to, from) {
      this.pageTitle = to.meta.title
      console.log(to)
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
