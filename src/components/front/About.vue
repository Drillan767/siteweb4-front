<template>
  <div class="about">
    <div class="header">
      <h1>{{ $t('navbar.about') }}</h1>
    </div>
    <div class="content row">
      <div class="col-md-4 picture">
        <img :src="$parent.user.profile_pic" alt="">
      </div>
      <div class="col-md-8 text" v-html="translate"></div>
      <div class="col-md-12 social-medias">
        <a
          v-for="(sm, index) in JSON.parse(this.$parent.settings.social_medias)"
          :key="index"
          target="_blank"
          :href="sm.url"
        >
          <i :class="sm.icon.name"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
export default {

  mounted () {
    this.$parent.setTitle(this.$t('navbar.about'))
  },

  computed: {
    translate () {
      if (this.$i18n.locale === 'fr') {
        return marked(this.$parent.user.about_fr)
      } else {
        return marked(this.$parent.user.about_en)
      }
    }
  }
}
</script>
