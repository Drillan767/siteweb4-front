<template>
  <div class="about">
    <h1>About</h1>
  </div>
</template>

<script>
export default {

  beforeCreate () {
    this.$parent.setTitle(this.$t('navbar.about'))
  }
}
</script>
