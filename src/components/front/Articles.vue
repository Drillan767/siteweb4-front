<template>
<div class="front-articles">
  <div class="header">
    <h1>Blog</h1>
  </div>
  <p class="filter">
    <span @click="selected = 'all'" :class="[selected === 'all' ? 'active' : '']">{{ $t('misc.all') }} </span>
    <span
      v-for="(tag, index) in tags"
      :key="index" @click="selected = tag.name.toLowerCase()"
      :class="[selected === tag.name.toLowerCase() ? 'active' : '']"
    >
      {{ tag.name }}
    </span>
  </p>
  <isotope class="posts" ref="cpt" :list="filteredArticles" :options="option">
    <div class="post" v-for="article in filteredArticles" :key="article.id">
      <div class="post-bg" :style="{ backgroundImage: `url(${article.illustration})` }"></div>
      <div class="post-content">
        <p class="post-content-date">
          {{ dateFormat(article.created_at) }}
        </p>
        <h3 class="post-content-title">
          <router-link :to="`article/${article.slug}`">{{ article.title }}</router-link>
        </h3>
        <router-link :to="`article/${article.slug}`">{{ $t('article.read') }}</router-link>
      </div>
    </div>
  </isotope>
  <br clear="all">
  <div class="more">
    <span v-if="incomplete" @click="loadMore">{{ $t('article.load') }}</span>
  </div>
</div>
</template>

<script>
// import _ from 'lodash'
import isotope from 'vueisotope'
import moment from 'moment'
export default {
  components: {isotope},
  data () {
    return {
      articles: [],
      filtered: [],
      tags: [],
      selected: 'all',
      page: 2,
      loading: false,
      incomplete: true,
      option: {
        itemSelector: 'posts',
        getSortData: {
          id: 'id'
        },
        sortBy: 'id'
      }
    }
  },

  mounted () {
    this.$axios.get('/tags')
      .then(response => {
        console.log(response.data)
        this.tags = response.data
      })

    this.$parent.setTitle('Blog')
    this.$parent.setBackground(this.$parent.settings.article_bg)

    this.$axios.post('post/infinite', {page: 1, limit: 6})
      .then(response => {
        console.log(response)
        if (response.data.data.length < 6) this.incomplete = false
        this.articles = response.data.data
      })
      .catch(e => {
        console.log(e.response)
      })
  },

  methods: {
    loadMore () {
      this.$axios.post('/post/infinite', {page: this.page, limit: 6})
        .then(response => {
          this.page++
          if (response.data.data.length < 6) this.incomplete = false
          response.data.data.map(article => {
            this.articles.push(article)
          })
        })
        .catch(e => {
          console.log(e.response)
        })
    },

    dateFormat (date) {
      const format = this.$i18n.locale === 'fr' ? 'DD/MM/YYYY' : 'YYYY/MM/DD'
      return moment(date).format(format)
    }
  },

  computed: {
    filteredArticles () {
      if (this.selected === 'all') {
        return this.articles
      } else {
        let self = this
        return this.articles.filter(article => article.tags.some(tag => tag.name === self.selected))
      }
    }
  }
}

</script>
