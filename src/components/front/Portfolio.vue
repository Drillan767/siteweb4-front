<template>
  <div class="portfolio">
    <div class="header">
      <h1>Portfolio</h1>
    </div>
    <div class="warning" v-if="denied">
      <p>{{ $t('misc.denied') }}</p>
    </div>
    <p class="filter">
      <span @click="selected = 'all'" :class="[selected === 'all' ? 'active' : '']">{{ $t('misc.all') }} </span>
      <span
        v-for="(tag, index) in tags"
        :key="index" @click="selected = tag.id"
        :class="[selected === tag.id ? 'active' : '']"
      >
      {{ tag[`name_${$i18n.locale}`] }}
    </span>
    </p>
    <isotope class="projects" :options="options" :list="filteredProjects">
      <div :class="['project', index % 5 === 0 && index !== 0 && 'long']" v-for="(project, index) in filteredProjects" :key="index">
        <div class="hovereffect">
          <img :src="getThumbnail(index, project)" class="img-responsive"/>
          <div class="overlay">
            <h2>{{ project.title }}</h2>
            <router-link class="info" :to="`${$t('project.simple')}/${project.slug}`">{{ $t('project.see') }}</router-link>
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
  data () {
    return {
      projects: [],
      filtered: [],
      tags: [],
      ids: [],
      selected: 'all',
      denied: false,
      options: {
        itemSelector: 'projects',
        layoutMode: 'fitRows',
        getSortData: {
          id: 'id'
        },
        masonry: {
          gutter: 10
        },
        sortBy: 'created_at'
      }
    }
  },

  mounted () {
    this.$parent.setTitle('Portfolio')
    this.$axios.get('/portfolio')
      .then(response => {
        this.projects = response.data
        response.data.map(project => {
          project.tags.map(tag => {
            if (!this.ids.includes(tag.id)) {
              this.tags.push(tag)
              this.ids.push(tag.id)
            }
          })
        })
      })
      .catch(e => {
        console.log(e.response)
      })
    if (window.location.search.includes('denied')) {
      this.denied = true
    }
  },

  methods: {
    getThumbnail (index, project) {
      let thumbnail = JSON.parse(project.thumbnail)
      if (index !== 0 && index % 5 === 0) {
        return thumbnail.wide
      } else {
        return thumbnail.small
      }
    }
  },

  computed: {
    filteredProjects () {
      if (this.selected === 'all') {
        return this.projects
      } else {
        let self = this
        return this.projects.filter(project => project.tags.some(tag => tag.id === self.selected))
      }
    }
  }

}
</script>
