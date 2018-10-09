<template>
  <div class="article-show">
    <h1>{{ post.title }}</h1>
    <div>
      <img :src="post.illustration" alt="">
    </div>
    <div v-html="toHTML"></div>
  </div>
</template>

<script>
import marked from 'marked'
export default {

  data () {
    return {
      post: {
        title: '',
        content: '',
        illustration: '',
        tags: '',
        draft: true,
        lang: 'fr'
      }
    }
  },

  created () {
    this.$axios.get(`/post/${this.$route.params.slug}`)
      .then(response => {
        if (response.status === 204) {
          this.$router.replace('/404')
        }
        console.log(response)
        this.post = response.data
      })
      .catch(e => {
        console.log(e.response)
      })
  },

  methods: {

  },

  computed: {
    toHTML () {
      return marked(this.post.content, {sanitized: true})
    }
  }
}
</script>
