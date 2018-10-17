<template>
  <div class="bg-article-show">
    <div class="row">
      <h1>{{ post.title }}</h1>
      <div class="row col-md-8 status">
        <span v-if="post.draft" class="badge badge-secondary">Draft</span>
        <span v-else class="badge badge-success">Published</span>
        <span>Language saved : {{ post.lang === 'fr' ? 'Français' : 'English' }}</span>
        <span>Created on {{ formatDate(post.created_at) }}</span>
        <span>Updated on {{ formatDate(post.updated_at) }}</span>
      </div>
      <div class="col-md-4 bulk">
        <router-link class="btn btn-outline-warning" :to="`/admin/article/edit/${post.id}`">
          <i class="fas fa-wrench"></i>
          Edit
        </router-link>
        <button class="btn btn-outline-danger" @click="deleteArticle">
          <i class="fas fa-trash-alt"></i>
          Delete
        </button>
      </div>
      <div class="img-preview">
        <a data-fancybox="gallery" :href="post.illustration">
          <img :src="post.illustration">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        title: '',
        content: '',
        tags: '',
        draft: true,
        lang: 'fr'
      },
      errors: null,
      fieldsInError: [],
      label: null
    }
  },

  mounted () {
    this.$axios.get(`/post/${this.$route.params.slug}`)
      .then(response => {
        if (response.status === 204) {
          this.$router.replace('/404')
        }
        console.log(response)
        this.post = response.data
        document.title = this.post.title
      })
      .catch(e => {
        console.log(e.response)
      })
  },

  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    },

    deleteArticle () {
      // ...
    }
  }
}
</script>
