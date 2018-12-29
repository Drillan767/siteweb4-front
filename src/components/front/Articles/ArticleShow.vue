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
            <i :class="tag.icon"></i>
            {{ tag[`name_${$i18n.locale}`] }}
          </span>
        </router-link>
      </div>
      <div class="col-md-4 text-right date">
        <span>
          {{ this.comments.filter(comment => comment.accepted).length }}
          {{ $tc('article.comment', this.comments.length)}}
        </span>
        <span>/ </span>
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
    <div class="back">
      <router-link class="icon" to="/blog" :title="$t('misc.back')">
        <i class="fas fa-th"></i>
      </router-link>
    </div>
    <div class="article-related" v-if="related.length > 0">
      <h1>{{ $t('article.related') }}</h1>
      <div class="related row">
        <div class="article col-md-3" v-for="(article, index) in related" :key="index">
          <img :src="`${article.thumbnail}`" :alt="$parent.basename(article.thumbnail)" class="article-bg">
          <div class="article-content">
            <p class="article-content-date">
              {{ dateFormat(article.created_at) }}
            </p>
            <h3 class="article-content-title">
              <router-link :to="`article/${article.slug}`">{{ article.title }}</router-link>
            </h3>
            <router-link :to="`article/${article.slug}`">{{ $t('article.read') }}</router-link>
          </div>
        </div>
      </div>
    </div>
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
export default {
  components: { Comments },
  metaInfo () {
    return {
      title: this.article.title,
      meta: [
        {
          'property': 'og:title',
          'content': this.$t('navbar.about')
        },
        {
          'property': 'og:image',
          'content': this.article.illustration
        },
        {
          'property': 'og:url',
          'content': window.location.host + this.$router.history.current.fullPath
        }
      ]
    }
  },

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
      comments: [],
      related: []
    }
  },

  mounted () {
    this.$axios.get(`/post/${this.$route.params.slug}`)
      .then(response => {
        if (response.status === 204) {
          this.$router.replace('/404')
        }
        this.article = response.data
        this.article.tags.map(tag => {
          this.$axios.post('/post/related', { tagId: tag.id, postId: this.article.id })
            .then(response => {
              if (response.data.length > 0) {
                response.data.map(data => {
                  if (!this.related.filter(r => r.title === data.title).length > 0) {
                    this.related.push(data)
                  }
                })
              }
            })
        })

        if (this.$parent.logged === false && this.article.draft) {
          this.$router.replace('/blog?denied=1')
        }

        this.$parent.setBackground(this.$parent.settings.article_bg)

        this.$axios.post('/comments', { post_id: response.data.id })
          .then(response => {
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
    dateFormat (date) {
      const format = this.$i18n.locale === 'fr' ? 'DD/MM/YYYY' : 'YYYY/MM/DD'
      return moment(date).format(format)
    }
  },

  computed: {
    toHTML () {
      return marked(this.article.content, { sanitized: true })
    }
  }
}
</script>
