<template>
<div class="front-layout">
  <h1>Layouuuut</h1>
  <ul>
    <li><router-link to="/">Accueil</router-link></li>
    <li><router-link to="/articles">Articles</router-link></li>
    <li><router-link to="/portfolio">Portfolio</router-link></li>
    <li><router-link to="/about">À Propos</router-link></li>
    <li><router-link to="/contact">Contact</router-link></li>
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
