<template>
  <div class="user-settings">
    <form @submit.prevent="submit" class="form-horizontal col-sm-8 offset-sm-2">
      <div v-if="errors.length > 0" class="errors">
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error.message }}</li>
        </ul>
      </div>
      <div class="ok" v-if="success">
        <p>Settings successfully saved</p>
      </div>
      <div class="form-group row">
        <label for="first_name" class="col-sm-4 col-form-label">First Name</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="first_name" v-model="user.first_name" placeholder="First name">
        </div>
      </div>
      <div class="form-group row">
        <label for="last_name" class="col-sm-4 col-form-label">Last Name</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="last_name" v-model="user.last_name" placeholder="Last Name">
        </div>
      </div>
      <div class="form-group row">
        <label for="email_address" class="col-sm-4 col-form-label">Email Address</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="email_address" v-model="user.email" placeholder="Email Address">
        </div>
      </div>
      <div class="form-group row">
        <label for="job_title" class="col-sm-4 col-form-label">Job Title</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="job_title" v-model="user.job_title" placeholder="Job Title">
        </div>
      </div>
      <div class="form-group row">
        <label for="first_name" class="col-sm-4 col-form-label">Birthday</label>
        <div class="col-sm-6 date">
          <date-picker type="date" id="birthday" lang="en" v-model="user.birthday" format="DD/MM/YYYY"/>
        </div>
      </div>

      <div class="form-group row col-md-10 offset-1 profile">
        <a
          :href="user.profile_pic"
          data-fancybox="gallery"
          :data-caption="label"
          v-if="user.profile_pic"
        >
          <img :src="user.profile_pic" />
        </a>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="profile_pic" @change="handleChange">
          <label class="custom-file-label form-control" for="profile_pic">
            {{ label || 'Profile Picture' }}
          </label>
        </div>
      </div>

      <div class="col-md-10 offset-md-1 form-group">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="write-fr-tab"
              data-toggle="tab"
              href="#write-fr"
              role="tab"
              aria-controls="write-fr"
              aria-selected="true"
            >
            Write
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="result-fr-tab"
              data-toggle="tab"
              href="#result-fr"
              role="tab"
              aria-controls="result-fr"
              aria-selected="false"
            >
              Result
            </a>
          </li>
        </ul>

        <div class="tab-content" id="nav-about-fr">
          <div
            class="tab-pane fade show active"
            id="write-fr"
            role="tabpanel"
            aria-labelledby="write-fr-tab"
          >
            <label for="about_fr" hidden></label>
            <textarea
              id="about_fr"
              class="form-control"
              rows="6"
              @input="updatefr"
              v-model="user.about_fr">
            </textarea>
          </div>
          <div
            class="tab-pane fade"
            id="result-fr"
            role="tabpanel"
            aria-labelledby="result-fr-tab"
          >
            <div v-html="markdown_fr" class="md"></div>
          </div>
        </div>
      </div>

      <div class="col-md-10 offset-md-1 form-group">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="write-en-tab"
              data-toggle="tab"
              href="#write-en"
              role="tab"
              aria-controls="write-en"
              aria-selected="true"
            >
              Write
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="result-en-tab"
              data-toggle="tab"
              href="#result-en"
              role="tab"
              aria-controls="result-en"
              aria-selected="false"
            >
              Result
            </a>
          </li>
        </ul>

        <div class="tab-content" id="nav-about-en">
          <div
            class="tab-pane fade show active"
            id="write-en"
            role="tabpanel"
            aria-labelledby="write-en-tab"
          >
            <label for="about_en" hidden></label>
            <textarea
              id="about_en"
              class="form-control"
              rows="6"
              @input="updateen"
              v-model="user.about_en">
            </textarea>
          </div>
          <div
            class="tab-pane fade"
            id="result-en"
            role="tabpanel"
            aria-labelledby="result-en-tab"
          >
            <div v-html="markdown_en" class="md"></div>
          </div>
        </div>
      </div>

      <div class="col-md-10 offset-md-1">
        <label>Additional image for description</label>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="upload" @change="upload($event)">
          <label class="custom-file-label" for="upload">Choose file...</label>
        </div>
        <div class="extra-images">
          <button
            v-for="(image, index) in extra_images"
            class="btn btn-secondary"
            :key="index"
            @click.prevent="copy(image)"
          >
            {{ image.split(/[\\/]/).pop() }}
          </button>
        </div>
      </div>
      <hr />
      <div class="form-group row">
        <label for="new_pwd" class="col-sm-4 col-form-label">New password</label>
        <div class="col-sm-6">
          <input type="password" class="form-control" id="new_pwd" v-model="user.new_pwd" placeholder="New password (min: 8 characters)">
        </div>
      </div>
      <div class="form-group row">
        <label for="r_pwd" class="col-sm-4 col-form-label">Last Name</label>
        <div class="col-sm-6">
          <input type="password" class="form-control" id="r_pwd" v-model="user.r_pwd" placeholder="Repeat password">
        </div>
      </div>
      <div class="col-md-12 text-center">
        <button class="btn btn-outline-primary">Save changes</button>
      </div>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import _ from 'underscore'
import VueCookie from '../../settings/VueCookie'
import marked from 'marked'
import moment from 'moment'
export default {
  components: { DatePicker },
  mounted () {
    this.$parent.setBreadcrumb(['Dashboard', 'User settings'])
    this.$axios.get('/user')
      .then(response => {
        this.user = response.data
      })
      .catch(e => {
        console.log(e.response)
      })
    this.$parent.setTitle('User settings')
  },
  data () {
    return {
      user: {
        about_en: '',
        about_fr: '',
        birthday: '',
        email: '',
        job_title: '',
        first_name: '',
        last_name: '',
        profile_pic: '',
        new_pwd: '',
        r_pwd: ''
      },
      label: null,
      success: false,
      extra_images: [],
      errors: []
    }
  },

  methods: {
    handleChange (e) {
      if (!e.target.files.length) {
        return
      }

      const id = e.target.id
      const file = e.target.files[0]
      this.label = e.target.files[0].name
      this.createImage(file, id)
    },

    createImage (file) {
      let reader = new FileReader()
      let vm = this

      reader.onload = e => {
        vm.user.profile_pic = e.target.result
      }

      reader.readAsDataURL(file)
    },

    updatefr () {
      _.debounce(e => {
        this.user.about_fr = e.target.value
      })
    },

    updateen () {
      _.debounce(e => {
        this.user.about_en = e.target.value
      })
    },

    upload (e) {
      let formData = new FormData()
      formData.append('image', e.target.files[0])
      this.$axios.post('/user/upload', formData, {
        headers: {
          'Authorization': `Bearer ${VueCookie.get('token')}`
        }
      })
        .then(response => {
          this.extra_images.push(response.data)
        })
        .catch(e => {
          this.errors.push({ message: e.response.data.message })
        })
    },

    copy (image) {
      const basename = image.split(/[\\/]/).pop()
      navigator.clipboard.writeText(`![${basename}](${image})`)
        .catch((e) => {
          console.log(e)
        })
    },

    submit () {
      this.errors = []
      if (this.user.new_pwd.length > 0) {
        if (this.user.r_pwd.length > 0 && this.user.new_pwd !== this.user.r_pwd) {
          this.errors.push({ message: "Password aren't matching" })
        }
        if (this.user.r_pwd.length === 0) {
          this.errors.push({ message: 'Please repeat the password or leave both fields empty' })
        }
        if (this.user.new_pwd.length <= 7) {
          this.errors.push({ message: 'New password should length at least 8 characters' })
        }
      }
      let fields = ['first_name', 'last_name', 'email', 'job_title', 'birthday', 'about_en', 'about_fr']
      fields.map(field => {
        if (!this.user[field]) {
          this.errors.push({ message: `Field "${field}" is missing` })
        }
      })

      const matches = this.user.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
      if (matches.length === 0) {
        this.errors.push({ message: 'Please enter a valid mail' })
      }

      if (this.errors.length === 0) {
        let formdata = new FormData()
        formdata.append('first_name', this.user.first_name)
        formdata.append('last_name', this.user.last_name)
        formdata.append('email', this.user.email)
        formdata.append('job_title', this.user.job_title)
        formdata.append('birthday', moment(this.user.birthday).format('YYYY-MM-DD HH:mm:ss'))
        formdata.append('profile_pic', document.getElementById('profile_pic').files[0])
        formdata.append('extra_images', this.extra_images)
        formdata.append('about_en', this.user.about_en)
        formdata.append('about_fr', this.user.about_fr)
        formdata.append('password', this.user.new_pwd)

        this.$axios.put('/user_data', formdata, {
          headers: {
            'Authorization': `Bearer ${VueCookie.get('token')}`
          }
        })
          .then(response => {
            if (response.status === 200) {
              this.success = true
              $('html, body').animate({ scrollTop: 0 }, 'slow')
            }
          })
          .catch(e => {
            console.log(e)
            $('html, body').animate({ scrollTop: 0 }, 'slow')
            this.errors = e.response.data
          })
      }
    }
  },

  computed: {
    markdown_fr () {
      return marked(this.user.about_fr, { sanitized: true })
    },

    markdown_en () {
      return marked(this.user.about_en, { sanitized: true })
    }
  }
}
</script>
