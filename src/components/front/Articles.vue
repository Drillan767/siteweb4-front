<template>
<div class="front-articles">
  <div class="articles-header">
    <h1>Blog</h1>
  </div>
  <div class="posts">
    <div class="post" v-for="(article, index) in articles" :key="index">
      <div class="post-bg" :style="{ backgroundImage: 'url(' + article.illustration +')' }"></div>
      <span>{{ article.title }}</span>
    </div>
  </div>
</div>
</template>

<script>
import Isotope from 'isotope-layout'
export default {

  data () {
    return {
      articles: [],
      page: 2,
      loading: false,
      grid: null
    }
  },

  mounted () {
    this.grid = new Isotope(document.querySelector('.grid'), {
      itemSelector: '.grid-item',
      layoutMode: 'fitRows'
    })

    this.$axios.post('post/infinite', {page: this.page, limit: 6})
      .then(response => {
        console.log(response.data.data)
        this.articles = response.data.data
      })
      .catch(e => {
        console.log(e.response)
      })
    this.scroll()
  },

  methods: {
    scroll () {
      $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() === $(document).height()) {
          alert('bjr')
        }
      })
    },

    filter (tag) {
      this.grid.isotope({filter: `.${tag}`})
    }
  }
}

</script>

<!--this.$axios.post('/posts/infinite', {page: this.page, limit: 6})
.then(response => {
this.page++
console.log('ouais')
this.articles.push(response.data.data)
})-->
