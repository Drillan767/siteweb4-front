<template>
  <div class="about">
    <div class="header">
      <h1>{{ $t('navbar.about') }}</h1>
    </div>
    <div class="content row">
      <div class="col-md-4 picture">
        <img :src="$parent.user.profile_pic" :alt="$parent.basename($parent.user.profile_pic)">
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
  metaInfo () {
    return {
      title: this.$t('navbar.about'),
      meta: [
        {
          'property': 'og:title',
          'content': this.$t('navbar.about')
        },
        {
          'property': 'og:url',
          'content': window.location.host + this.$router.history.current.fullPath
        }
      ]
    }
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
