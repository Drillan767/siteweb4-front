<template>
  <div class="bg-article-show">
    <div class="ok" v-if="created">
      <p>Article successfully created</p>
    </div>
    <div class="ok" v-else-if="updated">
      <p>Article successfully updated</p>
    </div>
    <div class="row">
      <div class="row col-md-8 status">
        <span v-if="post.draft" class="badge badge-secondary">Draft</span>
        <span v-else class="badge badge-success">Published</span>
        <span>Language saved : {{ post.lang === 'fr' ? 'Français' : 'English' }}</span>
        <span>Created on {{ formatDate(post.created_at) }}</span>
        <span>Updated on {{ formatDate(post.updated_at) }}</span>
      </div>
      <div class="col-md-4 bulk">
        <router-link class="btn btn-outline-warning" :to="`/admin/article/edit/${post.slug}`">
          <i class="fas fa-wrench"></i>
          Edit
        </router-link>
        <button class="btn btn-outline-danger" @click="deleteArticle">
          <i class="fas fa-trash-alt"></i>
          Delete
        </button>
      </div>
      <div class="col-md-8 tags">
        <span class="label">Tags:</span>
        <div class="labels">
          <router-link
            v-for="(tag, index) in post.tags"
            :key="index"
            :to="`/tag/${tag.slug}`"
            class="badge badge-secondary"
          >
            <i :class="tag.icon"></i>
            {{ tag.name_en }}
          </router-link>
        </div>
      </div>
      <div class="img-preview">
        <a data-fancybox="gallery" :href="post.illustration">
          <img :src="post.illustration">
        </a>
      </div>
      <div v-html="toHTML" class="content-preview col-md-8"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import SweetAlert from '../../../settings/SweetAlert2'
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
      label: null,
      created: false,
      updated: false
    }
  },

  mounted () {
    this.$axios.get(`/post/${this.$route.params.slug}`)
      .then(response => {
        if (response.status === 204) {
          this.$router.replace('/404')
        }
        this.post = response.data
        this.$parent.setTitle(this.post.title)
        this.$parent.setBreadcrumb(['Dashboard', 'All articles', this.post.title])
      })
      .catch(e => {
        console.log(e.response)
      })
    if (window.location.search.substr(1).includes('created')) {
      this.created = true
    } else if (window.location.search.substr(1).includes('updated')) {
      this.updated = true
    }
  },

  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    },

    deleteArticle () {
      SweetAlert.delete(
        `Delete "${this.post.title}"?`,
        `Are you sure you want to delete "${this.post.title}"?`,
        'warning',
        `Article "${this.post.title}" was successfully deleted`,
        `/post/${this.post.id}`,
        '/admin/articles'
      )
    }
  },

  computed: {
    toHTML () {
      return marked(this.post.content, { sanitized: true })
    }
  }
}
</script>
