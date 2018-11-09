<template>
  <div class="articles">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Language</th>
          <th>Status</th>
          <th>Created at</th>
          <th>Updated at</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="index">
          <td><router-link :to="`/admin/article/${ post.slug }`">{{ post.title }}</router-link></td>
          <td>{{ post.lang === 'fr' ? 'Français' : 'English' }}</td>
          <td>{{ post.draft ? 'Published' : 'Draft' }}</td>
          <td>{{ formatDate(post.created_at) }}</td>
          <td>{{ formatDate(post.updated_at) }}</td>
          <td>
            <div class="actions">
              <span @click="handlePublish(post.id)">{{ post.draft ? 'Unpublish' : 'Publish' }}</span>
              |
              <router-link :to="`/admin/article/edit/${post.slug}`">Edit</router-link>
              |
              <span @click="handleDelete(post, index)">Delete</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import VueCookie from '../../../settings/VueCookie'
import SweetAlert from '../../../settings/SweetAlert2'
export default {
  data () {
    return {
      posts: []
    }
  },

  mounted () {
    this.$axios.get('/posts')
      .then(response => {
        this.posts = response.data
      })
      .catch(e => console.log(e.response))
    this.$parent.setTitle('All articles')
  },

  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    },

    handlePublish (id) {
      this.$axios.post('/post/publish', {id: id}, {
        headers: {
          'Authorization': `Bearer ${VueCookie.get('token')}`
        }})
        .then(response => {
          this.posts = this.posts.map((post, index) => {
            if (post.id === id) {
              return response.data
            }
          })
        })
        .catch(e => console.log(e.response))
    },

    handleDelete (post, index) {
      SweetAlert.delete(
        `Delete "${post.title}"?`,
        `Are you sure you want to delete "${post.tite}"?`,
        'warning',
        `"${post.title}" was successfully deleted`,
        `/post/${post.id}`
      )
        .then(result => {
          if (result.value) {
            this.posts.splice(index, 1)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
