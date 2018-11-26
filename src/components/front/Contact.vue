<template>
  <div class="contact">
    <div class="header">
      <h1>Contact</h1>
    </div>
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-md-4 side">
          <div class="side-message" @mouseover="ee" @mouseleave="reset">
            <h1 v-if="easter" :class="easter ? 'ee' : ''">[ HYPE INTENSIFIES ]</h1>
            <p v-else v-html="replace($t('contact.intro'))"></p>
          </div>
        </div>
        <div class="col-md-8 row">
          <div class="contact-error" v-if="errors.length > 0">
            <ul>
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </div>
          <div v-if="success" class="col-md-12 contact-success">
            <p>{{ $t('contact.ok') }}</p>
          </div>
          <div class="col-md-6">
            <input
              type="email"
              v-model="message.email"
              :class="easter ? 'ee' : ''"
              :placeholder="$t('contact.email')"
              required
            >
          </div>
          <div class="col-md-6">
            <input
              type="text"
              v-model="message.name"
              :placeholder="$t('contact.name')"
              :class="easter ? 'ee' : ''"
              required
            >
          </div>
          <div class="col-md-12">
            <input
              type="text"
              v-model="message.object"
              :placeholder="$t('contact.subject')"
              :class="easter ? 'ee' : ''"
              required
            >
          </div>
          <div class="col-md-12">
            <textarea
              rows="5"
              v-model="message.message"
              placeholder="Message..."
              :class="easter ? 'ee' : ''"
              required
            ></textarea>
          </div>
          <input type="checkbox" v-model="honey_pot" hidden>
          <div class="col-md-12 text-right">
            <button :class="easter ? 'ee' : ''">
              {{ $t('contact.send') }}
              <i class="fas fa-rocket"></i>
            </button>
        </div>
      </div>
      </div>
    </form>

    <div class="modal fade" id="calmdown" tabindex="-1" data-backdrop="false" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <img :src="buckaroo" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCookie from '../../settings/VueCookie'
import buckaroo from '../../assets/img/stopspam.jpg'
export default {
  data () {
    return {
      message: {
        name: '',
        object: '',
        email: '',
        message: '',
        read: false
      },
      honey_pot: false,
      buckaroo: buckaroo,
      timeInterval: null,
      errors: [],
      success: false,
      easter: false,
      seconds: 0
    }
  },

  mounted () {
    this.$parent.setTitle('Contact')
  },

  methods: {
    submit () {
      this.errors = []
      this.success = false
      if (VueCookie.has('contact') || this.honey_pot) {
        $('#calmdown').modal()
      } else {
        let fields = ['name', 'object', 'email', 'message']
        fields.map(field => {
          if (this.message[field] === '') {
            this.errors.push({field: field})
          }
        })
        const matches = this.message.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
        if (matches.length === 0) {
          this.errors.push({field: 'email', message: this.$t('contact.fakeMail')})
        }

        if (this.errors.length === 0) {
          this.$axios.post('/message', this.message)
            .then(response => {
              if (response.data === 'ok') this.success = true
              this.success = true
              VueCookie.setWithDeath('contact', 'true', 5)
            })
            .catch(e => {
              e.response.data.map(error => {
                this.errors.push(error)
              })
            })
        }
      }
    },

    replace (str) {
      return str.replace('%mail%', `<a href="mailto:${this.$parent.user.email}">${this.$parent.user.email}</a>`)
    },

    stopTimer () {
      if (this.timeInterval) clearInterval(this.timeInterval)
    },

    ee () {
      this.stopTimer()

      this.timeInterval = setInterval(() => {
        this.seconds += 1
        if (this.seconds >= 5) {
          this.easter = true
          this.stopTimer()
        }
      }, 1000)
    },

    reset () {
      this.seconds = 0
      this.stopTimer()
    }
  }
}
</script>
