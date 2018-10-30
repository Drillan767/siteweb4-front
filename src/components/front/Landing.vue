<template>
  <div class="landing">
    <div class="container centered">
      <div class="content">
        <div class="profile">
          <img :src="this.user.profile_pic" alt="">
        </div>
        <h1 v-if="user">{{ `${user.first_name} ${user.last_name}` }}</h1>
        <h2 v-if="user">{{ getAge(user.birthday) }} {{ $t("misc.years") }}, {{ user.job_title }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      user: {
        about: '',
        birthday: '',
        email: '',
        job_title: '',
        first_name: '',
        last_name: '',
        profile_pic: ''
      }
    }
  },

  mounted () {
    this.user = this.$parent.user
  },

  methods: {
    getAge (date) {
      const now = moment()
      const birthday = moment(date)
      const duration = moment.duration(now.diff(birthday))
      return Math.floor(duration.asYears())
    }
  },

  beforeCreate () {
    this.$parent.setTitle(this.$t('navbar.home'))
  }
}
</script>
