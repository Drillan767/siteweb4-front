<template>
  <div class="admin-layout">
    <h1>Admin Layouuuuuut</h1>
    <ul>
      <li><router-link to="/admin">Dashboard</router-link></li>
    </ul>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: null
    }
  }
}
</script>
