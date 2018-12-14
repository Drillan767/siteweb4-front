<template>
  <div class="dashboard">
    <div class="row">
      <div class="card col-md-5 offset-1">
        <div class="card-body">
          <h5 class="card-title">Articles</h5>
          <table class="table table-borderless">
            <tbody>
            <tr>
              <td>Total</td>
              <td>Published</td>
              <td>Draft</td>
            </tr>
              <tr>
                <td>{{ articles.all }}</td>
                <td>{{ articles.published }}</td>
                <td>{{ articles.draft }}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-right">
            <router-link to="/admin/articles" class="btn btn-outline-secondary">See all</router-link>
          </div>
        </div>
      </div>
      <div class="card col-md-5 offset-1">
        <div class="card-body">
          <h5 class="card-title">Projects</h5>
          <table class="table table-borderless">
            <tbody>
            <tr>
              <td>Total</td>
              <td>Published</td>
              <td>Draft</td>
            </tr>
            <tr>
              <td>{{ projects.all }}</td>
              <td>{{ projects.published }}</td>
              <td>{{ projects.draft }}</td>
            </tr>
            </tbody>
          </table>
          <div class="text-right">
            <router-link to="/admin/portfolio" class="btn btn-outline-secondary">See all</router-link>
          </div>
        </div>
      </div>
      <div class="card col-md-5 offset-1">
        <div class="card-body">
          <h5 class="card-title">Comments</h5>
          <table class="table table-borderless">
            <tbody>
            <tr>
              <td>Total</td>
              <td>Approved</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>{{ comments.all }}</td>
              <td>{{ comments.accepted }}</td>
              <td>{{ comments.pending }}</td>
            </tr>
            </tbody>
          </table>
          <div class="text-right">
            <router-link to="/admin/comments" class="btn btn-outline-secondary">See all</router-link>
          </div>
        </div>
      </div>
      <div class="card col-md-5 offset-1">
        <div class="card-body">
          <h5 class="card-title">Messages</h5>
          <table class="table table-borderless">
            <tbody>
            <tr>
              <td>Total</td>
              <td>Read</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>{{ messages.all }}</td>
              <td>{{ messages.read }}</td>
              <td>{{ messages.pending }}</td>
            </tr>
            </tbody>
          </table>
          <div class="text-right">
            <router-link to="/admin/messages" class="btn btn-outline-secondary">See all</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCookie from '../../settings/VueCookie'
export default {
  data () {
    return {
      projects: {
        all: 0,
        published: 0,
        draft: 0
      },
      articles: {
        all: 0,
        published: 0,
        draft: 0
      },
      comments: {
        total: 0,
        accepted: 0,
        pending: 0
      },
      messages: {
        total: 0,
        read: 0,
        pending: 0
      }
    }
  },

  mounted () {
    this.$parent.setBreadcrumb('Dashboard')
    this.$axios.post('/all', {}, {
      headers: {
        'Authorization': `Bearer ${VueCookie.get('token')}`
      }
    })
      .then(response => {
        const { articles, projects, comments, messages } = response.data
        this.articles = articles
        this.projects = projects
        this.comments = comments
        this.messages = messages
      })
      .catch(e => {
        console.log(e)
      })
  },

  beforeCreate () {
    this.$parent.setTitle('Dashboard')
  }
}
</script>
