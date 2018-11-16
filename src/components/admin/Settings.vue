<template>
  <div class="row">
    <div class="col-md-8 mx-auto edit-settings">
      <div class="alert alert-danger" v-if="errors" role="alert">
        <span>Please fix the following problems:</span>
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error.message }}
          </li>
        </ul>
      </div>
      <form @submit.prevent="submit">
        <div class="form-group row">
          <div class="input-group col-md-6">
            <a
              :href="settings.landing_bg"
              data-fancybox="gallery"
              :data-caption="file_label.landing_bg"
              v-if="settings.landing_bg"
            >
              <img :src="settings.landing_bg" :alt="file_label.landing_bg" />
            </a>
            <div class="custom-file">
              <input type="file" id="landing_bg" class="custom-file-input" @change="handleChange">
              <label
                class="custom-file-label"
                for="landing_bg"
              >
                {{ file_label.landing_bg || 'Landing Background' }}
              </label>
            </div>
          </div>
          <div class="input-group col-md-6">
            <a
              :href="settings.article_bg"
              data-fancybox="gallery"
              :data-caption="file_label.article_bg"
              v-if="settings.article_bg"
            >
              <img :src="settings.article_bg" :alt="file_label.article_bg" />
            </a>
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="article_bg" @change="handleChange">
              <label
                class="custom-file-label"
                for="article_bg"
              >
                {{ file_label.article_bg || 'Article Background' }}
              </label>
            </div>
          </div>
          <div class="input-group col-md-6">
            <div v-if="settings.portfolio_bg">
              <a
                :href="settings.portfolio_bg"
                data-fancybox="gallery"
                :data-caption="file_label.portfolio_bg"
              >
                <img :src="settings.portfolio_bg" :alt="file_label.portfolio_bg" />
              </a>
            </div>
            <div class="custom-file">
              <input type="file" id="portfolio_bg" class="custom-file-input" @change="handleChange">
              <label
                class="custom-file-label"
                for="portfolio_bg"
              >
                {{ file_label.portfolio_bg || portfolio }}
              </label>
            </div>
          </div>
          <div class="input-group col-md-6">
            <a
              :href="settings.about_bg"
              data-fancybox="gallery"
              :data-caption="file_label.about_bg"
              v-if="settings.about_bg"
            >
              <img :src="settings.about_bg" :alt="file_label.about_bg" />
            </a>
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="about_bg" @change="handleChange">
              <label
                class="custom-file-label"
                for="about_bg"
              >
                {{ file_label.about_bg || 'About Background' }}
              </label>
            </div>
          </div>
          <div class="col-md-12 row">
            <div class="input-group col-md-6 mx-auto">
              <a
                :href="settings.contact_bg"
                data-fancybox="gallery"
                :data-caption="file_label.contact_bg"
                v-if="settings.contact_bg"
              >
                <img :src="settings.contact_bg" :alt="file_label.contact_bg" />
              </a>
              <div class="custom-file">
                <input type="file" id="contact_bg" class="custom-file-input" @change="handleChange">
                <label
                  class="custom-file-label"
                  for="contact_bg"
                >
                  {{ file_label.contact_bg || 'Contact Background' }}
                </label>
              </div>
            </div>
          </div>

          <div class="input-group col-md-6">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fab fa-facebook"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="Facebook URL" v-model="settings.facebook">
          </div>

          <div class="input-group col-md-6">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fab fa-twitter"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="Twitter's URL" v-model="settings.twitter">
          </div>

          <div class="input-group col-md-6">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fab fa-linkedin-in"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="LinkedIn's URL" v-model="settings.linkedin">
          </div>

          <div class="input-group col-md-6">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fab fa-medium-m"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="Medium's URL" v-model="settings.medium">
          </div>

          <div class="form-group col-sm-6">
            <label for="website_name">Website's name</label><br />
            <input type="text" id="website_name" class="form-control" placeholder="Website's name" v-model="settings.website_name">
          </div>

          <div class="form-group col-sm-6">
            <label for="settings_dark">Set website in <b>{{ settings.dark_mode ? 'dark' : 'light'}}</b> mode</label><br />
            <label class="switch">
              <input type="checkbox" id="settings_dark" v-model="settings.dark_mode">
              <span class="slider round"></span>
            </label>
          </div>

          <div class="col-sm-12 text-center">
            <button class="btn btn-outline-primary">Save changes</button>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import VueCookie from '../../settings/VueCookie'
export default {
  data () {
    return {
      settings: {
        medium: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        landing_bg: '',
        about_bg: '',
        contact_bg: '',
        article_bg: '',
        portfolio_bg: '',
        website_name: '',
        dark_mode: true
      },
      file_label: {
        landing_bg: null,
        contact_bg: null,
        about_bg: null,
        article_bg: null,
        portfolio_bg: null
      },
      errors: null
    }
  },

  methods: {
    handleChange (e) {
      if (!e.target.files.length) {
        return
      }

      const id = e.target.id
      const file = e.target.files[0]
      this.file_label[id] = e.target.files[0].name.substring(0, 25) + '...'
      this.createImage(file, id)
    },

    createImage (file, field) {
      let reader = new FileReader()
      let vm = this

      reader.onload = e => {
        vm.settings[field] = e.target.result
      }

      reader.readAsDataURL(file)
    },

    submit () {
      let formData = new FormData()
      formData.append('landing_bg', document.getElementById('landing_bg').files[0])
      formData.append('about_bg', document.getElementById('about_bg').files[0])
      formData.append('portfolio_bg', document.getElementById('portfolio_bg').files[0])
      formData.append('article_bg', document.getElementById('article_bg').files[0])
      formData.append('contact_bg', document.getElementById('contact_bg').files[0])
      formData.append('medium', this.settings.medium)
      formData.append('linkedin', this.settings.linkedin)
      formData.append('twitter', this.settings.twitter)
      formData.append('facebook', this.settings.facebook)
      formData.append('website_name', this.settings.website_name)
      formData.append('dark_mode', this.settings.dark_mode ? 1 : 0)

      this.$axios.post('/settings', formData, {
        headers: {
          'Authorization': `Bearer ${VueCookie.get('token')}`
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log(e.response)
        })
    }
  },

  mounted () {
    this.$axios.get('/admin_settings', {
      headers: {
        'Authorization': `Bearer ${VueCookie.get('token')}`
      }
    })
      .then(response => {
        this.settings = response.data
      })
      .catch(e => {
        console.log(e.response)
      })
    this.$parent.setTitle('Global settings')
    $('[data-fancybox="gallery"]').fancybox()
  }
}
</script>
