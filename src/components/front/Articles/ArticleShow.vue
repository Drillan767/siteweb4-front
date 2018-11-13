<template>
  <div class="article-show">
    <div class="article-header">
      <div class="article-bg" :style="{ backgroundImage: `url(${article.illustration})` }"></div>
      <br clear="all">
      <h1>{{ article.title }}</h1>
    </div>

    <div class="row article-details">
    <div class="tags col-md-8">
      <router-link
        v-for="(tag, index) in article.tags"
        :key="index"
        :to="`/tag/${tag.slug}`"
        :title="tag[`name_${$i18n.locale}`]"
        class="tag"
      >
          <span class="tag-body">
          <i :class="['fas', getFAClass(tag.category)]"></i>
          {{ tag[`name_${$i18n.locale}`] }}
        </span>
      </router-link>
    </div>
    <div class="col-md-4 text-right date">
      <span>{{ this.comments.length }} {{ $tc('article.comment', this.comments.length)}}</span>
      <span>/</span>
      <span v-if="article.created_at === article.updated_at">
        <i class="far fa-clock"></i>
        {{ dateFormat(article.created_at) }}
      </span>
      <span v-else>
        <i class="far fa-clock"></i>
        {{ dateFormat(article.updated_at) }}
      </span>
    </div>
    </div>
    <div v-html="toHTML" class="article-content col-lg-10 offset-lg-1"></div>

    <div class="article-comments col-lg-10 offset-lg-1">
      <h1>Comments</h1>
      <Comments :comments="comments" :id="article.id" />
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import moment from 'moment'
import Comments from './Comments/Comments'
import CommentForm from './Comments/Forms/CommentForm'
export default {
  components: {Comments, CommentForm},
  data () {
    return {
      article: {
        title: '',
        content: '',
        illustration: '',
        tags: '',
        draft: true,
        lang: 'fr',
        created_at: '',
        updated_at: ''
      },
      comments: []
    }
  },

  mounted () {
    this.$axios.get(`/post/${this.$route.params.slug}`)
      .then(response => {
        if (response.status === 204) {
          this.$router.replace('/404')
        }
        this.article = response.data

        this.$parent.setTitle(this.article.title)
        this.$parent.setBackground(this.$parent.settings.article_bg)

        this.$axios.post('/comments', {post_id: response.data.id})
          .then(response => {
            console.log(response.data)
            this.comments = response.data
          })
          .catch(e => {
            console.log(e.response)
          })
      })
      .catch(e => {
        console.log(e.response)
      })

    const bg = document.querySelector('.article-bg')
    const wWidth = window.innerWidth / 5
    const wHeight = window.innerHeight / 5
    bg.addEventListener('mousemove', (e) => {
      const X = e.clientX / wWidth
      const Y = e.clientY / wHeight
      bg.style.transform = `translate3d(-${X}%, -${Y}%, 0) scale(1.3)`
    })
  },

  methods: {
    getFAClass (name) {
      let fas = {
        project_type: 'fa-screwdriver',
        language: 'fa-cog',
        misc: 'fa-circle',
        general_subject: 'fa-book'
      }
      return fas[name]
    },

    dateFormat (date) {
      const format = this.$i18n.locale === 'fr' ? 'DD/MM/YYYY' : 'YYYY/MM/DD'
      return moment(date).format(format)
    }
  },

  computed: {
    toHTML () {
      return marked(this.article.content, {sanitized: true})
    }
  }
}
</script>
