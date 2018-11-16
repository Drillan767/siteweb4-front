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
        <div class="project-bg" :style="{ backgroundImage: `url(${project.illustration})` }"></div>
        {{ project.title }}
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
        getSortData: {
          id: 'id'
        },
        sortBy: 'created_at'
      },
      masonry: {
        gutter: 10
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
      if (index % 2 === 0) {
        response += ' width-2'
      }
      if (index % 3 === 0) {
        response += ' height-2'
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
