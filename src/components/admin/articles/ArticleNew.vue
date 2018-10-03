<template>
  <div class="col-md-8 offset-md-2">
    <form @submit.prevent="submit">

      <div class="form-group">
        <label for="article_title">Title</label>
        <input type="text" class="form-control" id="article_title" aria-describedby="emailHelp" placeholder="Title">
      </div>

      <div class="form-group">
        <label for="article_draft">Save and publish?</label><br />
        <label class="switch">
          <input type="checkbox" id="article_draft">
          <span class="slider round"></span>
        </label>
      </div>

      <div class="form-group">
        <label for="illustration">Illustration</label>
        <input type="file" class="form-control-file" id="illustration">
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <textarea class="form-control" @focus="stackedit" id="article_content" rows="3"></textarea>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {

      },
      error: []
    }
  },

  methods: {
    submit () {
      /* this.$axios.post('/post', )
        .then(response => {
          if (response.status === 200) {
            this.$router.replace({ name: 'admin' })
          }
        }) */
    },

    stackedit () {
      const el = document.querySelector('textarea')
      const stackedit = new this.$stackedit()

      stackedit.openFile({
        content: el.value
      })

      stackedit.on('fileChange', (file) => {
        el.value = file.content.text
      })
    }
  }
}
</script>
