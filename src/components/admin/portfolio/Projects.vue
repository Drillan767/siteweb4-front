<template>
  <div class="projects">
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Title</th>
        <th>Status</th>
        <th>Created at</th>
        <th>Updated at</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in projects" :key="index">
          <td><router-link :to="`/admin/project/${ project.slug }`">{{ project.title}}</router-link></td>
          <td>{{ project.draft ? 'Pending' : 'Published'}}</td>
          <td>{{ formatDate(project.created_at) }}</td>
          <td>{{ formatDate(project.updated_at) }}</td>
          <td>
            <div class="actions">
              <span @click="handlePublish(project.id)">{{ project.draft ? 'Publish' : 'Unpublish' }}</span>
              |
              <router-link :to="`/admin/project/edit/${project.slug}`">Edit</router-link>
              |
              <span @click="handleDelete(project, index)">Delete</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SweetAlert from '../../../settings/SweetAlert2'
import VueCookie from '../../../settings/VueCookie'
export default {
  data () {
    return {
      projects: []
    }
  },

  mounted () {
    this.$axios.get('/portfolio')
      .then(response => {
        this.projects = response.data
      })
      .catch(e => {
        console.log(e.response)
      })
  },

  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    },

    handlePublish (id) {
      this.$axios.post('/portfolio/publish', {id: id}, {
        headers: {
          'Authorization': `Bearer ${VueCookie.get('token')}`
        }})
        .then(response => {
          this.projects = this.projects.map((project, index) => {
            if (project.id === id) {
              return response.data
            }
          })
        })
        .catch(e => console.log(e.response))
    },

    handleDelete (project, index) {
      SweetAlert.delete(
        `Delete "${project.title}"?`,
        `Are you sure you want to delete "${project.tite}"?`,
        'warning',
        `"${project.title}" was successfully deleted`,
        `/portfolio/${project.id}`
      )
        .then(result => {
          if (result.value) {
            this.projects.splice(index, 1)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  beforeCreate () {
    this.$parent.setTitle('All projects')
  }
}
</script>
