<template>
  <div class="articles">
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Tags</th>
          <th>Language</th>
          <th>Status</th>
          <th>Created at</th>
          <th>Updated at</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="index">
          <td><router-link :to="`/article/${ post.slug }`">{{ post.title }}</router-link></td>
          <td>TODO: tag sysem</td>
          <td>{{ post.lang === 'fr' ? 'Français' : 'English' }}</td>
          <td>{{ post.draft === "false" ? 'Published' : 'Draft' }}</td>
          <td>{{ formatDate(post.created_at) }}</td>
          <td>{{ formatDate(post.updated_at) }}</td>
          <td>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-outline-success">
                <input type="radio" name="options" id="option1" autocomplete="off" checked>
                <i class="far fa-file-alt"></i> {{ post.draft === "false" ? 'Unpublish' : 'Publish' }}
              </label>
              <label class="btn btn-outline-warning">
                <input type="radio" name="options" id="option2" autocomplete="off">
                <i class="fas fa-edit"></i> Edit
              </label>
              <label class="btn btn-outline-danger">
                <input type="radio" name="options" id="option3" autocomplete="off">
                <i class="fas fa-times"></i> Delete
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: []
    }
  },

  mounted () {
    this.$axios.get('/posts')
      .then(response => {
        console.log(response)
        this.posts = response.data
      })
      .catch(e => console.log(e.response))
  },

  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>
