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

      <div class="form-group col-md-10 offset-1">
        <nav>
          <div class="nav nav-tabs" id="nav-tab-fr" role="tablist">
            <a
              class="nav-item nav-link active"
              id="nav-write-tab-fr"
              data-toggle="tab"
              href="#nav-write-fr" role="tab"
              aria-controls="nav-write-fr"
              aria-selected="true">
              Write
            </a>
            <a
              class="nav-item nav-link"
              id="nav-result-tab-fr"
              data-toggle="tab"
              href="#nav-result"
              role="tab"
              aria-controls="nav-result"
              aria-selected="false">
              Result
            </a>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent-fr">
          <div
            class="tab-pane fade show active"
            id="nav-write-fr"
            role="tabpanel"
            aria-labelledby="nav-write-tab"
          >
            <textarea class="form-control" v-model="user.about_fr" @input="updatefr" id="about-fr" rows="6"></textarea>
          </div>
          <div
            class="tab-pane fade"
            id="nav-result-fr"
            role="tabpanel"
            aria-labelledby="nav-result-tab"
          >
            <div v-html="about_fr"></div>
            <hr />
          </div>
        </div>
      </div>

      <div class="form-group col-md-10 offset-1">
        <nav>
          <div class="nav nav-tabs" id="nav-tab-en" role="tablist">
            <a
              class="nav-item nav-link active"
              id="nav-write-tab-en"
              data-toggle="tab"
              href="#nav-write-fr" role="tab"
              aria-controls="nav-write"
              aria-selected="true">
              Write
            </a>
            <a
              class="nav-item nav-link"
              id="nav-result-tab-en"
              data-toggle="tab"
              href="#nav-result-en"
              role="tab"
              aria-controls="nav-result-en"
              aria-selected="false">
              Result
            </a>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent-en">
          <div
            class="tab-pane fade show active"
            id="nav-write-en"
            role="tabpanel"
            aria-labelledby="nav-write-tab"
          >
            <textarea class="form-control" v-model="user.about_en" @input="updateen" id="about" rows="6"></textarea>
          </div>
          <div
            class="tab-pane fade"
            id="nav-result-en"
            role="tabpanel"
            aria-labelledby="nav-result-tab"
          >
            <div v-html="about_en"></div>
            <hr />
          </div>
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
  components: {DatePicker},
  mounted () {
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
        profile_pic: ''
      },
      label: null,
      success: false,
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

    submit () {
      let fields = ['first_name', 'last_name', 'email', 'job_title', 'birthday', 'about_en', 'about_fr']
      fields.map(field => {
        if (!this.user[field]) {
          this.errors.push({message: `Field "${field}" is missing`})
        }
      })

      const matches = this.user.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
      if (matches.length === 0) {
        this.errors.push({message: 'Please enter a valid mail'})
      }

      if (this.errors.length === 0) {
        let formdata = new FormData()
        formdata.append('first_name', this.user.first_name)
        formdata.append('last_name', this.user.last_name)
        formdata.append('email', this.user.email)
        formdata.append('job_title', this.user.job_title)
        formdata.append('birthday', moment(this.user.birthday).format('YYYY-MM-DD HH:mm:ss'))
        formdata.append('profile_pic', document.getElementById('profile_pic').files[0])
        formdata.append('about_en', this.user.about_en)
        formdata.append('about_fr', this.user.about_fr)

        this.$axios.put('/user_data', formdata, {
          headers: {
            'Authorization': `Bearer ${VueCookie.get('token')}`
          }
        })
          .then(response => {
            if (response.status === 200) {
              this.success = true
              $('html, body').animate({scrollTop: 0}, 'slow')
            }
          })
          .catch(e => {
            console.log(e.response)
            this.errors = e.response.data
          })
      }
    }
  },

  computed: {
    about_fr () {
      return marked(this.user.about_fr, {sanitized: true})
    },

    about_en () {
      return marked(this.user.about_en, {sanitized: true})
    }
  }
}
</script>
