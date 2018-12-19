<template>
  <div class="portfolio-show">
    <div class="header" :style="`background-image: url(${project.illustration})`">
      <h1>{{ project.title }}</h1>
    </div>
    <div class="project-details row">
      <div class="tags col-md-8">
        <router-link
          v-for="(tag, index) in project.tags"
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
        <span v-if="project.created_at === project.updated_at">
          <i class="far fa-clock"></i>
          {{ dateFormat(project.created_at) }}
        </span>
        <span v-else>
          <i class="far fa-clock"></i>
          {{ dateFormat(project.updated_at) }}
        </span>
      </div>
    </div>
    <div class="project-body" v-if="!project.images">
      <div class="col-md-8 offset-md-2 project-body-content" v-html="toHTML"></div>
    </div>
    <div v-else class="project-body row">
      <div class="col-md-4 row project-body-images">
        <a
          :href="image" data-fancybox="gallery"
          v-for="(image, index) in JSON.parse(project.images)"
          :key="index"
        >
          <img :src="image" :alt="$parent.basename(image)">
        </a>
      </div>
      <div class="col-md-8 project-body-content" v-html="toHTML"></div>
    </div>
    <div class="project-links">
      <a v-if="project.website" :href="project.website" target="_blank">
        {{ $t('project.website') }}
        <i class="fas fa-globe-africa"></i>
      </a>
      <a v-if="project.github" :href="project.github" target="_blank">
        {{ $t('project.github') }}
        <i class="fab fa-github"></i>
      </a>
    </div>
    <div class="project-back">
      <router-link class="icon" to="/portfolio" :title="$t('misc.back')">
        <i class="fas fa-th"></i>
      </router-link>
    </div>
    <div class="project-related" v-if="related.length > 0">
      <h1>{{ $t('project.related')}}</h1>
      <div class="related row">
        <div class="project col-md-3" v-for="(project, index) in related" :key="index" v-if="index <= 4">
          <div class="hovereffect">
            <img :src="JSON.parse(project.thumbnail).small" class="img-responsive"/>
            <div class="overlay">
              <h2>{{ project.title }}</h2>
              <router-link class="info" :to="`${$t('project.simple')}/${project.slug}`">{{ $t('project.see') }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import marked from 'marked'
export default {
  metaInfo () {
    return {
      title: this.project.title,
      meta: [
        {
          'property': 'og:title',
          'content': this.project.title
        },
        {
          'property': 'og:image',
          'content': this.project.illustration
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
      project: {
        title: '',
        illustration: '',
        content: '',
        images: '',
        website: '',
        github: '',
        tags: [],
        draft: true,
        lang: 'fr'
      },
      related: []
    }
  },

  mounted () {
    this.$axios.get(`/portfolio/${this.$route.params.slug}`)
      .then(response => {
        if (response.data.draft) {
          this.$router.replace('/portfolio?denied=1')
        }

        this.project = response.data
        this.project.tags.map(tag => {
          this.$axios.post('/portfolio/related', {tag_id: tag.id, project_id: this.project.id})
            .then(response => {
              response.data.map(data => {
                if (!this.related.filter(r => r.title === data.title).length > 0) {
                  this.related.push(data)
                }
              })
            })
        })
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
      let el = $('<div></div>')
      el.html(marked(this.project.content, {sanitized: true}))
      $('img', el).parent('a').attr('data-fancybox', 'gallery')
      return el[0].innerHTML
    }
  }
}
</script>
