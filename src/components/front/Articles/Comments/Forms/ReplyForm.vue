<template>
  <form @submit.prevent="submit" class="article-reply">
    <div v-if="errors.length > 0">
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error.error }}</li>
      </ul>
    </div>
    <div v-else-if="success">
      <p>Thanks! Your comment will show up once reviewed!</p>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label for="email">{{ $t('comment.email_p') }}</label>
        <input type="email" placeholder="Email" v-model="comment.email" class="form-control" id="email" required>
      </div>
      <div class="col-md-6">
        <label for="username">{{ $t('comment.username') }}</label>
        <input type="text" :placeholder="$t('comment.username')" v-model="comment.name" id="username" required class="form-control">
      </div>
      <div class="col-md-12">
        <label for="message">Message</label>
        <textarea class="form-control" rows="5" v-model="comment.comment" id="message" placeholder="Message..."></textarea>
      </div>
      <input type="checkbox" class="d-none" v-model="comment.honey_pot">
      <div class="col-md-12 text-right">
        <button class="btn btn-outline-danger">{{ $t('comment.cancel') }}</button>
        <button class="btn btn-outline-primary">{{ $t('comment.send') }}</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ReplyForm',
  data () {
    return {
      comment: {
        name: '',
        email: '',
        comment: '',
        reply: 1,
        accepted: false,
        post_id: 1,
        created_at: '',
        honey_pot: false
      },
      errors: [],
      success: false
    }
  },

  props: ['reply', 'post_id'],

  mounted () {
    this.comment.reply = this.reply
    this.comment.post_id = this.post_id
  },

  methods: {
    submit () {
      if (this.comment.honey_pot) {
        this.errors.push({error: 'Sorry for the racism but the comment section is for humans only.'})
      }
      let fields = ['name', 'email', 'comment']
      fields.map(field => {
        if (this.comment[field].length === 0) {
          this.errors.push({
            field: field,
            error: `field ${field} is missing`
          })
        }
      })

      if (this.errors.length === 0) {
        this.$axios.post('comment', this.comment)
          .then(response => {
            this.success = true
            this.$parent.comments.push(response.data)
          })
          .catch(e => {
            console.log(e.response.data)
          })
      }
    }
  }
}
</script>
