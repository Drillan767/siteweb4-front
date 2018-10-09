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
        <input type="text" :class="[errorByName('title'), 'form-control']" v-model="post.title" id="article_title" placeholder="Title">
        <div class="invalid-feedback" v-if="errorByName('title') === 'is-invalid'">
          A title is required.
        </div>
      </div>

      <div class="form-group">
        <label for="article_tags">Tags</label>
        <input type="text" :class="[errorByName('tags'), 'form-control']" v-model="post.tags" id="article_tags" placeholder="Tags">
        <div class="invalid-feedback" v-if="errorByName('tags') === 'is-invalid'">
          Please insert at least one tag.
        </div>
      </div>

      <label>Illustration</label>
      <div class="custom-file">
        <input type="file" class="custom-file-input" id="article_illustration" required>
        <label class="custom-file-label" for="article_illustration">Choose file...</label>
        <div class="invalid-feedback">Example invalid custom file feedback</div>
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
            <textarea :class="[errorByName('content'), 'form-control']" v-model="post.content" @input="update" id="article_content" rows="6"></textarea>
            <div class="invalid-feedback" v-if="errorByName('content') === 'is-invalid'">
              Please insert at least one tag.
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-result"
            role="tabpanel"
            aria-labelledby="nav-result-tab"
          >
            <div v-html="compiledMarkdown"></div>
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

      <button type="button" v-on:click="draft(true)" class="btn btn-outline-secondary">Save as draft</button>
      <button type="button" v-on:click="draft(false)" class="btn btn-outline-primary">Save and publish</button>
    </form>
  </div>
</template>

<script>
import _ from 'underscore'
import marked from 'marked'
import VueCookie from '../../../settings/VueCookie'
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
      errors: null
    }
  },

  methods: {
    submit () {
      let formData = new FormData()
      formData.append('title', this.post.title)
      formData.append('tags', this.post.tags)
      formData.append('content', this.post.content)
      formData.append('illustration', document.getElementById('article_illustration').files[0])
      formData.append('draft', this.post.draft)
      formData.append('lang', this.post.lang ? 'fr' : 'en')
      this.$axios.post('/post', formData, {
        headers: {
          'Authorization': `Bearer ${VueCookie.get('token')}`
        }
      })
        .then(response => {
          this.$route.replace({url: `/article/${response.data.slug}`, props: {created: true}})
        })
        .catch(e => {
          console.log(e.response)
          this.errors = e.response.data
        })
    },

    draft (value) {
      this.post.draft = value
      this.submit()
    },

    errorByName (field) {
      if (this.errors && this.errors.filter(error => error.field === field)) {
        return 'is-invalid'
      } else {
        return ''
      }
    },

    update () {
      _.debounce(e => {
        this.post.content = e.target.value
      })
    }
  },

  computed: {
    compiledMarkdown () {
      return marked(this.post.content, {sanitized: true})
    }
  }
}
</script>
