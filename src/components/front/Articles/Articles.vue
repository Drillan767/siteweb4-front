<template>
<div class="front-articles">
  <div class="header">
    <h1>Blog</h1>
  </div>
  <div class="warning" v-if="denied">
    <p>{{ $t('misc.denied') }}</p>
  </div>
  <p class="filter">
    <span @click="selected = 'all'" :class="[selected === 'all' ? 'active' : '']">{{ $t('misc.all') }} </span>
    <span
      v-for="(tag, index) in tags"
      :key="index" @click="selected = tag.id"
      :class="[selected === tag.id ? 'active' : '']"
    >
      {{ tag[`name_${$i18n.locale}`] }}
    </span>
  </p>
  <isotope class="posts" ref="cpt" :list="filteredArticles" :options="option">
    <div class="post" v-for="(article, index) in filteredArticles" :key="index">
      <img :src="`${article.thumbnail}`" alt="" class="post-bg">
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
import isotope from 'vueisotope'
import moment from 'moment'
export default {
  components: {isotope},
  data () {
    return {
      articles: [],
      filtered: [],
      tags: [],
      ids: [],
      selected: 'all',
      page: 2,
      loading: false,
      incomplete: true,
      denied: false,
      option: {
        itemSelector: 'posts',
        getSortData: {
          id: 'id'
        },
        sortBy: 'created_at'
      }
    }
  },

  mounted () {
    this.$parent.setTitle('Blog')
    if (window.location.search.includes('denied')) {
      this.denied = true
    }

    this.$axios.post('post/infinite', {page: 1, limit: 6})
      .then(response => {
        if (response.data.data.length < 6) this.incomplete = false
        this.articles = response.data.data
        response.data.data.map(article => {
          article.tags.map(tag => {
            if (!this.ids.includes(tag.id)) {
              this.tags.push(tag)
              this.ids.push(tag.id)
            }
          })
        })
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
            response.data.data.map(article => {
              article.tags.map(tag => {
                if (!this.ids.includes(tag.id)) {
                  this.tags.push(tag)
                  this.ids.push(tag.id)
                }
              })
            })
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
        return this.articles.filter(article => article.tags.some(tag => tag.id === self.selected))
      }
    }
  }
}

</script>
