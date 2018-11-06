<template>
  <div class="front-layout" :style="{ backgroundImage: `url(${background})` }">
    <section class="container">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <router-link class="nav-main" to="/">{{ settings.website_name }}</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" :to="$t('links.about')">{{ $t("navbar.about") }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/blog">Blog</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/portfolio">{{ $t("navbar.projects") }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">{{ $t("navbar.contact")}}</router-link>
            </li>
            <li class="nav-item">
              <hr class="mobile" />
              <p class="nav-link pipe">|</p>
            </li>
            <li class="nav-item">
              <span v-if="$i18n.locale === 'en'" @click="handleLocale('fr')" class="nav-link">Français</span>
              <span v-else class="nav-link" @click="handleLocale('en')">English</span>
            </li>
          </ul>
        </div>
      </nav>
      <!--<transition name="slideup">-->
        <router-view></router-view>
      <!--</transition>-->
    </section>
    <footer></footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: null,
      background: '',
      settings: {
        medium: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        landing_bg: '',
        about_bg: '',
        contact_bg: '',
        article_bg: '',
        portfolio_bg: '',
        website_name: '',
        dark_mode: true
      },
      user: {
        about: '',
        birthday: '',
        email: '',
        job_title: '',
        first_name: '',
        last_name: '',
        profile_pic: ''
      }
    }
  },

  watch: {
    $route (to, from) {
      console.log(from.name)
      console.log(to.name)
      if (to.name === 'bog-show') {
        console.log('ouais')
        this.transitionName = 'slideup'
      }
    }
  },

  methods: {
    handleLocale (locale) {
      this.$i18n.locale = locale
    },

    setTitle (value) {
      document.title = `${this.settings.website_name} | ${value}`
    },

    setBackground (image) {
      this.background = image
    }
  },

  beforeCreate () {
    this.$axios.get('/settings')
      .then(response => {
        this.user = response.data.user
        this.settings = response.data.settings
      })
  }
}
</script>
