<template>
  <!--<div class="front-layout" :style="{ backgroundImage: `url(${background})` }">-->
  <div class="front-layout" v-if="display">
    <section class="container">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <router-link class="nav-main" to="/">
          <span :data-letters="settings.website_name">
            {{ settings.website_name }}
          </span>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" :to="$t('links.about')">{{ $t("navbar.about") }}</router-link>
            </li>
            <li class="nav-item">
              <router-link :class="['nav-link', blog && 'active']" to="/blog">
                Blog
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :class="['nav-link', project && 'active']" to="/portfolio">{{ $t("navbar.projects") }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">{{ $t("navbar.contact") }}</router-link>
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
    <div class="banner" v-if="banner" @click="close">
      <p>{{ $t('misc.cookies') }}<br />
        <router-link :to="$t('links.legalNotice')">{{ $t('misc.cookieLink') }}</router-link>
      </p>
      <p>{{ $t('misc.cookieClose') }}</p>
    </div>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-4 main">
            <router-link to="/">
              <h3>{{ settings.website_name }}</h3>
            </router-link>
          </div>
          <div class="col-md-4 links">
            <router-link :to="$t('links.about')">{{ $t("navbar.about") }}</router-link>
            <router-link to="/blog" :class="blog && 'active'">Blog</router-link>
            <router-link to="/portfolio" :class="project && 'active'">{{ $t("navbar.projects") }}</router-link>
            <router-link to="/contact">{{ $t("navbar.contact") }}</router-link>
            <router-link :to="$t('links.legalNotice')">{{ $t('misc.legalNotice') }}</router-link>
            <router-link to="/admin" v-if="logged">Admin</router-link>
          </div>
          <div class="col-md-4 social-medias">
            <a v-for="(social, index) in JSON.parse(settings.social_medias)" :href="social.url" :key="index">
              <i :class="social.icon.name"></i>
            </a>
          </div>
          <div class="col-md-12 text-center copyright">
            <p>&copy; {{ settings.website_name }} - {{ new Date().getFullYear() }}</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import VueCookie from '../../settings/VueCookie'
export default {
  data () {
    return {
      transitionName: null,
      background: '',
      settings: {
        social_medias: '',
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
      },
      banner: true,
      display: false,
      blog: false,
      project: false,
      logged: false
    }
  },

  mounted () {
    if (VueCookie.has('banner')) {
      this.banner = false
    } else {
      VueCookie.set('banner', 'true')
    }

    this.blog = !!this.$route.path.includes('article')

    if (this.$route.path.includes('/projet/')) {
      this.project = true
    }

    this.$axios.post('/logged_in', {}, {
      headers: {
        'Authorization': `Bearer ${VueCookie.get('token')}`
      }
    })
      .then(response => {
        if (response.data === 'ok') {
          this.logged = true
        }
      })
      .catch(e => {
        if (e.response.status === 401) {
          this.logged = false
        }
      })
  },

  // http://localhost:8080/article/article-test-1

  methods: {
    handleLocale (locale) {
      this.$i18n.locale = locale
    },

    setTitle (value) {
      document.title = `${this.settings.website_name} | ${value}`
    },

    setBackground (image) {
      this.background = image
    },

    close () {
      this.banner = false
    }
  },

  beforeCreate () {
    this.$axios.get('/settings')
      .then(response => {
        this.user = response.data.user
        this.settings = response.data.settings
        this.display = true
      })
  },

  watch: {
    '$route': function () {
      this.blog = !!this.$route.path.includes('article')
      this.project = !!this.$route.path.includes('/projet/')
    }
  }
}
</script>
