<template>
  <div class="show-tag">
    <div class="header">
      <h1 v-if="selected === 'project'">{{ $t('tag.project') }} "{{ tag[`name_${$i18n.locale}`] }}"</h1>
      <h1 v-else-if="selected === 'article'">{{ $t('tag.article') }} "{{ tag[`name_${$i18n.locale}`] }}"</h1>
      <h1 v-else>{{ $t('tag.all') }} "{{ tag[`name_${$i18n.locale}`] }}"</h1>
      <h5>{{ tag[`description_${$i18n.locale}`] }}</h5>
    </div>

    <p class="filter">
      <span @click="selected = 'all'" :class="[selected === 'all' ? 'active' : '']">{{ $t('misc.all') }} </span>
      <span @click="selected = 'project'" :class="[selected === 'project' ? 'active' : '']">{{ $t('project.clean') }} </span>
      <span @click="selected = 'article'" :class="[selected === 'article' ? 'active' : '']">Article </span>
    </p>

    <isotope :list="result" class="list" :options="option">
      <div class="content col-md-3" v-for="(item, index) in result" :key="index">
        <div class="hovereffect">
          <img class="img-responsive" :src="item.illustration" alt="">
          <div class="overlay">
            <h2>{{ item.title }}</h2>
            <p>
              <router-link :to="`/${item.github ? $t('project.simple') : 'article' }/${item.slug}`">
                {{ $t('project.see') }}
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </isotope>
  </div>
</template>

<script>
import isotope from 'vueisotope'
export default {
  components: {isotope},
  metaInfo: {
    title: 'Tags',
    meta: [
      {
        'property': 'og:title',
        'content': 'Tags'
      },
      {
        'property': 'og:url',
        'content': window.location.host + this.$router.history.current.fullPath
      }
    ]
  },
  data () {
    return {
      tag: {
        name_en: '',
        name_fr: '',
        description_en: '',
        description_fr: '',
        project: null,
        post: null
      },
      option: {
        itemSelector: 'list'
      },
      selected: 'all',
      all: []
    }
  },

  mounted () {
    this.$axios.get(`/tag/${this.$route.params.slug}`)
      .then(response => {
        this.tag = response.data
        if (this.tag.posts.length > 0 && this.tag.project.length > 0) {
          let all = this.tag.posts.concat(this.tag.project)
          this.all = this.shuffle(all)
        } else if (this.tag.posts.length > 0 && this.tag.project.length === 0) {
          this.all = this.shuffle(this.tags.posts)
        } else {
          this.all = this.shuffle(this.tag.project)
        }
      })
  },

  methods: {
    shuffle (array) {
      let currentIndex = array.length
      let temporaryValue
      let randomIndex

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      return array
    }
  },

  computed: {
    result () {
      if (this.selected === 'all') {
        return this.all
      } else if (this.selected === 'article') {
        return this.tag.posts
      } else {
        return this.tag.project
      }
    }
  }
}
</script>
