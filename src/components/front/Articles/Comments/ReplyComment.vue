<template>
  <div class="replies">
    <div class="comment response" v-for="(reply, index) in comments" :key="index">
      <div class="comment-avatar">
        <i class="fas fa-user-circle"></i>
      </div>
      <div :class="['comment-cont', !reply.accepted && 'font-italic']">
        <div class="comment-meta">
        <span class="comment-meta-name">
          {{ reply.name }}
        </span>
          <span class="comment-meta-date">
          {{ $parent.dateFormat(reply.created_at) }}
        </span>
          <span class="comment-meta-reply" @click="toggle('replyForm')">
          {{ $t('article.reply') }}
        </span>
        </div>
        <div class="comment-text">
          <p>{{ reply.comment }}</p>
        </div>
      </div>
    </div>
    <div :is="currentComponent" v-bind="{post_id: post_id, reply: reply}" ></div>
  </div>
</template>

<script>
import CommentForm from './Forms/CommentForm'
import ReplyForm from './Forms/ReplyForm'
export default {
  name: 'ReplyComment',
  props: ['replies', 'reply', 'post_id'],
  components: {ReplyForm, CommentForm},

  data () {
    return {
      currentComponent: null,
      componentArray: ['commentForm'],
      comments: []
    }
  },

  mounted () {
    if (this.replies) {
      this.replies.map(reply => {
        this.comments.push(reply)
      })
    }
  },

  methods: {
    toggle (component) {
      this.currentComponent = component
    }
  }
}
</script>
