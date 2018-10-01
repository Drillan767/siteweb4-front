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
              <li><a>Customers</a></li>
            </ul>
            <p class="menu-label">
              Administration
            </p>
            <ul class="menu-list">
              <li><a>Team Settings</a></li>
              <li>
                <a>Manage Your Team</a>
                <ul>
                  <li><a>Members</a></li>
                  <li><a>Plugins</a></li>
                  <li><a>Add a member</a></li>
                </ul>
              </li>
              <li><a>Invitations</a></li>
              <li><a>Cloud Storage Environment Settings</a></li>
              <li><a>Authentication</a></li>
            </ul>
            <p class="menu-label">
              Transactions
            </p>
            <ul class="menu-list">
              <li><a>Payments</a></li>
              <li><a>Transfers</a></li>
              <li><a>Balance</a></li>
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
