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

      <h3>Dashboard</h3>

      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">

          <button type="button" id="sidebarCollapse" class="navbar-btn">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item"><a href="#">Library</a></li>
              <li class="breadcrumb-item active" aria-current="page"><a>Data</a></li>
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
  },

  mounted () {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active')
      $(this).toggleClass('active')
    })
  }
}
</script>
