<template>
  <div class="project-show">
    <div class="ok" v-if="created">
      <p>Project successfully created</p>
    </div>
    <div class="ok" v-else-if="updated">
      <p>Project successfully updated</p>
    </div>
    <div class="row">
      <div class="row col-md-8 status">
        <span v-if="project.draft" class="badge badge-secondary">Draft</span>
        <span v-else class="badge badge-success">Published</span>
        <span>Created on {{ formatDate(project.created_at) }}</span>
        <span>Updated on {{ formatDate(project.updated_at) }}</span>
      </div>
      <div class="col-md-4 bulk">
        <router-link class="btn btn-outline-warning" :to="`/admin/project/edit/${project.slug}`">
          <i class="fas fa-wrench"></i>
          Edit
        </router-link>
        <button class="btn btn-outline-danger" @click="deleteProject">
          <i class="fas fa-trash-alt"></i>
          Delete
        </button>
      </div>
      <div class="col-md-8 tags">
        <span class="label">Tags:</span>
        <div class="labels">
          <router-link
            v-for="(tag, index) in project.tags"
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
        <a data-fancybox="gallery" :href="project.illustration">
          <img :src="project.illustration">
        </a>
      </div>
      <div v-html="toHTML" class="content-preview col-md-8"></div>
      <div class="extra">
        <h4>Extra images</h4>
        <div class="images row">
          <div class="col-md-2 image" v-for="(image, index) in JSON.parse(project.images)" :key="index">
            <a :href="image" data-fancybox="gallery">
              <img :src="image" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SweetAlert from '../../../settings/SweetAlert2'
import marked from 'marked'
export default {
  data () {
    return {
      project: {
        title: '',
        illustration: '',
        content: '',
        images: null,
        website: '',
        github: '',
        tags: [],
        draft: true,
        lang: 'fr'
      },
      created: false,
      updated: false
    }
  },

  mounted () {
    this.$axios.get(`/portfolio/${this.$route.params.slug}`)
      .then(response => {
        this.project = response.data
        this.$parent.setTitle(this.project.title)
        this.$parent.setBreadcrumb(['Dashboard', 'Portfolio', this.project.title])
      })
      .catch(e => {
        console.log(e.response.data)
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

    deleteProject () {
      SweetAlert.delete(
        `Delete "${this.project.title}"?`,
        `Are you sure you want to delete "${this.project.title}"?`,
        'warning',
        `Article "${this.project.title}" was successfully deleted`,
        `/portfolio/${this.project.id}`,
        '/admin/portfolio'
      )
    }
  },

  computed: {
    toHTML () {
      let el = $('<div></div>')
      el.html(marked(this.project.content, {sanitized: true}))
      $('img', el).parent('a').attr('data-fancybox', 'gallery')
      $('img', el).each(() => {

      })
      return el[0].innerHTML
    }
  }
}
</script>
