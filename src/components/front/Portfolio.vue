<template>
  <div class="portfolio">
    <div class="header">
      <h1>Portfolio</h1>
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
      <div :class="['project', addClass(index)]" v-for="(project, index) in filteredProjects" :key="index">
        <div class="hovereffect">
          <img :src="project.illustration" class="img-responsive"/>
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
// import moment from 'moment'
export default {
  components: {isotope},
  data () {
    return {
      projects: [],
      filtered: [],
      tags: [],
      ids: [],
      selected: 'all',
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
  },

  methods: {
    addClass (index) {
      let response = ''
      if (index % 5 === 0) {
        response += ' col-md-5'
      } else {
        response += ' col-md-3'
      }
      return response
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
