<template>
<div class="articles">
  <h1>Liste des articles</h1>
  <div class="article-list">
    <div class="article" :key="index" v-for="(article, index) in articles">
      <h3>{{ article.title }}</h3>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      articles: null
    }
  },

  created () {
    this.$axios.get('/posts')
      .then(response => {
        this.articles = response.data
        console.log(this.articles)
      })
  }
}
</script>
