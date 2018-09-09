<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: null
    }
  },

  watch: {
    $route (to, from) {
      if (to.meta.order > from.meta.order) {
        this.transitionName = 'fadedown'
      } else if (to.meta.order < from.meta.order) {
        this.transitionName = 'fadeup'
      } else {
        this.transitionName = ''
      }
    }
  }
}
</script>
