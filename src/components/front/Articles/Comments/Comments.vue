<template>
  <div class="comments">
    <CommentForm :post_id="id" :reply="0" />
    <div v-for="(comment, index) in mainComments" :key="index">
      <div class="comment" v-if="comment.reply === 0">
        <div class="comment-avatar">
          <i class="fas fa-user-circle"></i>
        </div>
        <div class="comment-cont">
          <div class="comment-meta">
            <span class="comment-meta-name">
              {{ comment.name }}
            </span>
            <span class="comment-meta-date">
              {{ dateFormat(comment.created_at) }}
            </span>
            <span class="comment-meta-reply" @click="toggle(index)">
              {{ $t('article.reply') }}
            </span>
          </div>
          <div class="comment-text">
            <p>{{ comment.comment }}</p>
          </div>
        </div>
      </div>
      <ReplyComment
        :replies="responses(comment.id)"
        :post_id="id"
        :reply="comment.id"
        ref="replyComment"
      />
    </div>
  </div>
</template>

<script>
import CommentForm from './Forms/CommentForm'
import ReplyComment from './ReplyComment'
import moment from 'moment'
export default {
  name: 'Comments',
  components: {CommentForm, ReplyComment},
  props: ['comments', 'id'],
  data () {
    return {
      replies: []
    }
  },

  mounted () {
    console.log(this.$refs)
  },

  methods: {
    responses (id) {
      return this.comments.filter(comment => comment.reply === id && comment.accepted)
    },

    dateFormat (date) {
      const format = this.$i18n.locale === 'fr' ? 'DD/MM/YYYY' : 'YYYY/MM/DD'
      return moment(date).format(format)
    },

    toggle (index) {
      this.$refs.replyComment.map(comment => {
        comment.currentComponent = null
      })
      this.$refs.replyComment[index].toggle('replyForm')
    }
  },

  computed: {
    mainComments () {
      return this.comments.filter(comment => comment.reply === 0 && comment.accepted)
    }
  }
}
</script>
