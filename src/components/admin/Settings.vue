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
            <div class="custom-file" v-else>
              <input type="file" id="landing_bg" class="custom-file-input" @change="handleChange">
              <label class="custom-file-label" for="landing_bg">Landing background</label>
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
            <div class="custom-file" v-else>
              <input type="file" class="custom-file-input" id="article_bg" @change="handleChange">
              <label class="custom-file-label" for="article_bg">Article background</label>
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
              <button class="btn btn-danger" @click="removeImage('portfolio')">Remove image</button>
            </div>
            <div class="custom-file" v-else>
              <input type="file" id="portfolio_bg" class="custom-file-input" @change="handleChange">
              <label class="custom-file-label" for="portfolio_bg">Portfolio background</label>
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
            <div class="custom-file" v-else>
              <input type="file" class="custom-file-input" id="about_bg" @change="handleChange">
              <label class="custom-file-label" for="about_bg">About background</label>
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
              <div class="custom-file" v-else>
                <input type="file" id="contact_bg" class="custom-file-input" @change="handleChange">
                <label class="custom-file-label" for="contact_bg">Contact background</label>
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
            <input type="text" class="form-control" placeholder="Medium's URL" v-model="settings.linkedin">
          </div>

          <div class="form-group col-sm-6">
            <label for="settings_dark">Set website in <b>{{ settings.dark_mode ? 'dark' : 'light'}}</b> mode</label><br />
            <label class="switch">
              <input type="checkbox" id="settings_dark" v-model="settings.dark_mode">
              <span class="slider round"></span>
            </label>
          </div>

          <div class="form-group col-sm-6">
            <label for="enable_bg_image"><b>{{ settings.bg_images ? 'Enable' : 'Disable' }}</b> background images</label><br />
            <label class="switch">
              <input type="checkbox" id="enable_bg_image" v-model="settings.bg_images">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      settings: {
        birthday: '',
        medium: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        job_title: '',
        landing_bg: '',
        about_bg: '',
        contact_bg: '',
        article_bg: '',
        portfolio_bg: '',
        dark_mode: false,
        bg_images: false
      },
      file_label: {
        landing_bg: '',
        contact_bg: '',
        about_bg: '',
        article_bg: '',
        portfolio_bg: ''
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
      this.file_label[id] = e.target.files[0].name
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

    removeImage (field) {
      this.settings[field] = ''
      this.file_label[field] = ''
    }
  },

  created () {
    $('[data-fancybox="gallery"]').fancybox()
  }
}
</script>
