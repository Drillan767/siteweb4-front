<template>
  <div class="col-md-8 offset-md-2 article-new">
    <div class="alert alert-danger" v-if="errors" role="alert">
      <span>Please fix the following problems:</span>
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error.message }}
        </li>
      </ul>
    </div>

    <form @submit.prevent="submit">

      <div class="form-group">
        <label for="article_title">Title</label>
        <input type="text" :class="[fieldsInError.includes('title') ? 'is-invalid' : '', 'form-control']" v-model="post.title" id="article_title" placeholder="Title">
        <div class="invalid-feedback" v-if="fieldsInError.includes('title')">
          A title is required.
        </div>
      </div>

      <div class="form-group">
        <label>Tags</label>
        <VueMultiselect
          id="tags"
          :multiple="true"
          :options="tags"
          :close-on-select="false"
          label="name"
          track-by="name"
          v-model="post.tags"
        >
        </VueMultiselect>
      </div>

      <label>Illustration</label>
      <div class="custom-file">
        <input type="file" :class="[fieldsInError.includes('illustration') ? 'is-invalid' : '', 'custom-file-input']" id="article_illustration" @change="filename($event.target.files[0].name)" required>
        <label class="custom-file-label" for="article_illustration">{{ label ? label : 'Choose a file...' }}</label>
        <div class="invalid-feedback" v-if="fieldsInError.includes('illustration')">
          Please pick a valid image to upload
        </div>
      </div>

      <div class="form-group">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              class="nav-item nav-link active"
              id="nav-write-tab"
              data-toggle="tab"
              href="#nav-write" role="tab"
              aria-controls="nav-write"
              aria-selected="true">
              Write
            </a>
            <a
              class="nav-item nav-link"
              id="nav-result-tab"
              data-toggle="tab"
              href="#nav-result"
              role="tab"
              aria-controls="nav-result"
              aria-selected="false">
              Result
            </a>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-write"
            role="tabpanel"
            aria-labelledby="nav-write-tab"
          >
            <textarea :class="[fieldsInError.includes('content') ? 'is-invalid' : '', 'form-control']" v-model="post.content" @input="update" id="article_content" rows="6"></textarea>
            <div class="invalid-feedback" v-if="fieldsInError.includes('content')">
              This field is required and must contain at least 30 characters
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-result"
            role="tabpanel"
            aria-labelledby="nav-result-tab"
          >
            <div v-html="compiledMarkdown"></div>
            <hr />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="article_draft">{{ post.lang ? 'Publier en français' : 'Publish in english' }}</label><br />
        <label class="switch">
          <input type="checkbox" id="article_draft" v-model="post.lang">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="form-group text-right">
        <button type="button" v-on:click="draft(true)" class="btn btn-outline-secondary">Save as draft</button>
        <button type="button" v-on:click="draft(false)" class="btn btn-outline-primary">Save and publish</button>
      </div>

    </form>
  </div>
</template>

<script>
import _ from 'underscore'
import marked from 'marked'
import VueCookie from '../../../settings/VueCookie'
import VueMultiselect from 'vue-multiselect/src/Multiselect'

export default {
  components: {VueMultiselect},
  data () {
    return {
      post: {
        title: '',
        content: '',
        tags: [],
        draft: true,
        lang: 'fr'
      },
      selected: [],
      tags: [],
      options: [],
      errors: null,
      fieldsInError: [],
      label: null
    }
  },

  methods: {
    submit () {
      this.selected = this.post.tags.map(tag => tag.id)
      let formData = new FormData()
      formData.append('title', this.post.title)
      formData.append('tags', this.selected)
      formData.append('content', this.post.content)
      formData.append('illustration', document.getElementById('article_illustration').files[0])
      formData.append('draft', this.post.draft ? 1 : 0)
      formData.append('lang', this.post.lang ? 'fr' : 'en')
      this.$axios.post('/post', formData, {
        headers: {
          'Authorization': `Bearer ${VueCookie.get('token')}`
        }
      })
        .then(response => {
          this.$router.replace(`/admin/article/${response.data.slug}`)
        })
        .catch(e => {
          console.log(e)
          this.errors = e.response.data
          this.fieldsInError = []
          if (this.errors.constructor === Array) {
            this.errors.map(error => {
              this.fieldsInError.push(error.field)
            })
          } else {
            this.fieldsInError.push('illustration')
          }
        })
    },

    draft (value) {
      this.post.draft = value
      this.submit()
    },

    update () {
      _.debounce(e => {
        this.post.content = e.target.value
      })
    },

    filename (file) {
      this.label = file
    }
  },

  computed: {
    compiledMarkdown () {
      return marked(this.post.content, {sanitized: true})
    }
  },

  mounted () {
    this.$axios.get('/tags')
      .then(response => {
        this.tags = response.data
        this.tags.map(tag => {
          this.options.push({id: tag.id, name: tag.name})
        })
      })
  },

  beforeCreate () {
    this.$parent.setTitle('New article')
    this.$parent.pageTitle = 'New article'
  }
}
</script>
