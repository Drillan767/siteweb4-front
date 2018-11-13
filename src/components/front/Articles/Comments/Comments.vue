<template>
  <div class="comments">
    <CommentForm :post_id="id" :reply="0" />
    <div v-for="(comment, index) in comments" :key="index">
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
            <span class="comment-meta-reply">
              {{ $t('article.reply') }}
            </span>
          </div>
          <div class="comment-text">
            <p>{{ comment.comment }}</p>
          </div>
        </div>
      </div>
      <ReplyComment
        v-if="responses(comment.id).length > 0"
        :replies="responses(comment.id)"
        :post_id="id"
        :reply="comment.id"
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
    console.log(this.comments)
  },

  methods: {
    responses (id) {
      return this.comments.filter(comment => comment.reply === id)
    },

    dateFormat (date) {
      const format = this.$i18n.locale === 'fr' ? 'DD/MM/YYYY' : 'YYYY/MM/DD'
      return moment(date).format(format)
    }
  }
}
</script>
