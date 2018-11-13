<template>
  <div class="replies">
    <div class="comment response" v-for="(reply, index) in replies" :key="index">
      <div class="comment-avatar">
        <i class="fas fa-user-circle"></i>
      </div>
      <div class="comment-cont">
        <div class="comment-meta">
        <span class="comment-meta-name">
          {{ reply.name }}
        </span>
          <span class="comment-meta-date">
          {{ $parent.dateFormat(reply.created_at) }}
        </span>
          <span class="comment-meta-reply" @click="toggle(CommentForm)">
          {{ $t('article.reply') }}
        </span>
        </div>
        <div class="comment-text">
          <p>{{ reply.comment }}</p>
        </div>
      </div>
    </div>
    <ReplyForm :post_id="post_id" :reply="0" />
  </div>
</template>

<script>
import CommentForm from './Forms/CommentForm'
import ReplyForm from './Forms/ReplyForm'
export default {
  name: 'ReplyComment',
  props: ['replies', 'reply', 'post_id'],
  data () {
    return {
      currentComponent: null,
      componentArray: ['commentForm']
    }
  },

  components: {ReplyForm, CommentForm},

  mounted () {
    console.log(this.replies)
  },

  methods: {
    toggle (component) {
      this.currentComponent = component
    }
  }
}
</script>
