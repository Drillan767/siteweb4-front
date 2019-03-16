<template>
  <div class="col-md-8 offset-md-2 project-new">
    <div class="alert alert-danger" v-if="errors.length > 0" role="alert">
      <span>Please fix the following problems:</span>
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error.message }}
        </li>
      </ul>
    </div>
    <form @submit.prevent="submit">

      <div class="form-group">
        <label for="project_title">Title</label>
        <input type="text" :class="[fieldsInError.includes('title') ? 'is-invalid' : '', 'form-control']" v-model="project.title" id="project_title" placeholder="Title">
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
          label="name_en"
          track-by="name_en"
          v-model="project.tags"
        >
          <template
            slot="tag"
            slot-scope="props"
          >
            <span>
              <i :class="props.option.icon"></i>
              {{ cleaned(props.option.name_en) }}
            </span>
          </template>
          <template
            slot="option"
            slot-scope="props"
          >
            <span :class="props.option.class">
              <i :class="props.option.icon"></i>
              {{ list(props.option.name_en) }}
            </span>
          </template>
        </VueMultiselect>
      </div>

      <label>Illustration</label>
      <div class="custom-file">
        <input
          type="file"
          :class="[fieldsInError.includes('illustration') ? 'is-invalid' : '', 'custom-file-input']"
          id="project_illustration"
          @change="filename($event.target.files[0].name)"
          required
        >
        <label class="custom-file-label" for="project_illustration">{{ label ? label : 'Choose a file...' }}</label>
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
              id="nav-upload-tab"
              data-toggle="tab"
              href="#nav-upload" role="tab"
              aria-controls="nav-upload"
              aria-selected="true">
              Upload
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
            <textarea :class="[fieldsInError.includes('content') ? 'is-invalid' : '', 'form-control']" v-model="project.content" @input="update" id="project_content" rows="6"></textarea>
            <div class="invalid-feedback" v-if="fieldsInError.includes('content')">
              This field is required and must contain at least 30 characters
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-upload"
            role="tabpanel"
            aria-labelledby="nav-upload-tab"
          >
            <div class="form-group">
              <label for="extra_upload" hidden>Example file input</label>
              <div class="upload-btn-wrapper">
                <button class="btn-upload">Upload a file</button>
                <input type="file" id="extra_upload"
                       @change="upload($event)" />
              </div>
            </div>
            <div class="upload-list">
              <button
                v-for="(image, index) in extraImages"
                @click="copy(image)"
                :key="index"
                type="button"
                class="btn btn-secondary uploaded"
                title="click to copy"
              >
                {{ image.split(/[\\/]/).pop() }}
              </button>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-result"
            role="tabpanel"
            aria-labelledby="nav-result-tab"
          >
            <div v-html="compiledMarkdown" class="result"></div>
            <hr />
          </div>
        </div>
      </div>

      <label>Additional images</label>
      <div class="custom-file">
        <input
          type="file"
          :class="[fieldsInError.includes('images') ? 'is-invalid' : '', 'custom-file-input']"
          id="project_images"
          @change="handleMultiple"
          multiple="multiple"
          required
        />
        <label class="custom-file-label" for="project_images">{{ count > 0 ? `${count} images selected` : 'Select your files...' }}</label>
        <div class="invalid-feedback" v-if="fieldsInError.includes('images')">
          Please pick a valid image to upload
        </div>
      </div>

      <div v-if="images.length > 0" class="images row">
        <div class="col-md-4" v-for="(image, index) in images" :key="index">
          <a data-fancybox="gallery" :href="image" >
            <img :src="image" />
          </a>
        </div>
      </div>

      <div class="row form-group">
        <div class="input-group col-md-6">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fab fa-github"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="Link to repository" v-model="project.github">
        </div>

        <div class="input-group col-md-6">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-globe"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="Website's URL" v-model="project.website">
        </div>
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
  components: { VueMultiselect },
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
      selected: [],
      tags: [],
      images: [],
      extraImages: [],
      options: [],
      errors: [],
      fieldsInError: [],
      label: null,
      count: 0
    }
  },

  beforeCreate () {
    this.$parent.setTitle('New project')
    this.$parent.pageTitle = 'New project'
  },

  mounted () {
    this.$axios.get('/tags')
      .then(response => {
        this.tags = response.data
        this.tags.map(tag => {
          this.options.push({ id: tag.id, name: tag.name_en })
        })
      })
    this.$parent.setBreadcrumb(['Dashboard', 'Portfolio', 'New project'])
  },

  methods: {
    update () {
      _.debounce(e => {
        this.project.content = e.target.value
      })
    },

    copy (image) {
      const basename = image.split(/[\\/]/).pop()
      navigator.clipboard.writeText(`[![${basename}](${image.replace(/ /g, '%20')})](${image.replace(/ /g, '%20')})`)
        .catch((e) => {
          console.log(e)
        })
    },

    upload (e) {
      if (!e.target.files.length) return
      e.stopPropagation()
      e.preventDefault()
      let formdata = new FormData()
      formdata.append('file', e.target.files[0])
      this.$axios.post('/portfolio/upload', formdata, {
        headers: {
          'Authorization': `Bearer ${ VueCookie.get('token') }`
        }
      })
        .then(response => {
          this.extraImages.push(response.data)
        })
        .catch(e => {
          console.log(e.response)
        })
    },

    list (fa) {
      fa = fa.replace(/(fas|far|fab) fa-/gm, '')
      fa = fa.replace(/-/gm, ' ')
      fa = fa.split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
      return fa
    },

    cleaned (fa) {
      fa = fa.replace(/(fas|far|fab) fa-/gm, '')
      fa = fa.replace(/-/gm, ' ')
      fa = fa.split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
      return fa
    },

    filename (file) {
      this.label = file
    },

    handleMultiple (e) {
      let files = e.target.files
      this.count = files.length
      this.images = []
      let vm = this

      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader()
        reader.onload = e => {
          vm.images.push(e.target.result)
        }
        reader.readAsDataURL(files[i])
      }
    },

    draft (value) {
      this.project.draft = value
      this.submit()
    },

    submit () {
      this.errors = []
      let formData = new FormData()
      let imagesFiles = document.getElementById('project_images').files
      this.selected = this.project.tags.map(tag => tag.id)
      formData.append('title', this.project.title)
      formData.append('tags', this.selected)
      formData.append('website', this.project.website)
      formData.append('github', this.project.github)
      formData.append('content', this.project.content)
      this.extraImages.map(image => {
        formData.append('extra', image)
      })
      formData.append('illustration', document.getElementById('project_illustration').files[0])
      for (let i = 0; i < imagesFiles.length; i++) {
        formData.append('images[]', imagesFiles[i])
      }
      if (this.extraImages.length > 0) {
        this.extraImages.map(image => {
          if (this.project.content.includes(image.path)) {
            image.used = true
            formData.append('extra[]', image.path)
          }
        })
      }
      formData.append('draft', this.project.draft ? 1 : 0)

      this.$axios.post('/portfolio/store', formData, {
        headers: {
          'Authorization': `Bearer ${ VueCookie.get('token') }`
        }
      })
        .then(response => {
          if (response.status === 201) {
            this.$router.replace(`/admin/project/${response.data.slug}?created=1`)
          }
        })
        .catch(e => {
          e.response.data.map(error => {
            this.errors.push(error)
          })
        })
    }
  },

  computed: {
    compiledMarkdown () {
      return marked(this.project.content, { sanitized: true })
    }
  }
}
</script>
