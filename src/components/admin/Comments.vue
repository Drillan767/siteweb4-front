<template>
  <div class="comments">
    <div class="filter">
      <span :class="[filter === 'all' ? 'font-weight-bold' : '']" @click="filter = 'all'">All</span>
      |
      <span :class="[filter === 'pending' ? 'font-weight-bold' : '']" @click="filter = 'pending'">Pending</span>
      |
      <span :class="[filter === 'ok' ? 'font-weight-bold' : '']" @click="filter = 'ok'">Accepted</span>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Email</th>
        <th>Username</th>
        <th>Article's title</th>
        <th>Date</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(comment, index) in filteredComments"
          :key="index"
          :class="[comment.accepted ? '' : 'pending']">
          <td>{{ comment.email }}</td>
          <td>{{ comment.name }}</td>
          <td>
            <router-link :to="comment.post.slug">
              {{ comment.post.title }}
            </router-link>
          </td>
          <td>{{ dateFormat(comment.created_at) }}</td>
          <td>{{ comment.accepted ? 'Approved' : 'Pending' }}</td>
          <td>
            <span @click="showView(comment)">
              <i class="fas fa-search"></i>
            </span>
            |
            <span class="check" v-if="!comment.accepted" @click="handleDecision('accept', comment.id)">
              <i class="fas fa-check"></i>
            </span>
            <span class="time" v-else @click="handleDecision('deny', comment.id)">
              <i class="fas fa-times"></i>
            </span>
            |
            <span @click="handleDecision('delete', comment.id, index)">
              <i class="fas fa-trash-alt"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="showModal" tabindex="-1" data-backdrop="false" role="dialog" aria-labelledby="modalShow" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-6 email">
                  <p>{{ comment.email }}</p>
                </div>
                <div class="col-md-6 text-right name">
                  <p>{{ comment.name }}</p>
                </div>
                <div class="col-md-6 article">
                  <p>{{ comment.post.title }}</p>
                </div>
                <div class="col-md-6 text-right date">
                  <p>{{ dateFormat(comment.created_at) }}</p>
                </div>
                <div class="col-md-12 comment">
                  <p>{{ comment.comment }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-outline-danger" @click.prevent="handleDecision('delete', comment.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-success"
              @click.prevent="handleDecision('accept', comment.id)"
              v-if="comment.accepted"
            >
              <i class="fas fa-check"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-warning"
              @click.prevent="handleDecision('deny', comment.id)"
              v-if="!comment.accepted"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import VueCookie from '../../settings/VueCookie'
import SweetAlert from '../../settings/SweetAlert2'
export default {
  data () {
    return {
      comments: [],
      comment: {
        name: '',
        email: '',
        comment: '',
        accepted: false,
        post: {
          title: ''
        },
        reply: 0,
        post_id: 0,
        created_at: '',
        updated_at: ''
      },
      filter: 'all'
    }
  },

  mounted () {
    this.$axios.get('/all_comments')
      .then(response => {
        this.comments = response.data
      })
      .catch(e => {
        console.log(e.response)
      })
    this.$parent.setTitle('Comments')
  },

  methods: {
    dateFormat (date) {
      return moment(date).format('DD/MM/YYYY')
    },

    showView (comment) {
      this.comment = comment
      $('#showModal').modal()
    },

    handleDecision (decision, id, index = null) {
      if (decision !== 'delete') {
        this.$axios.post('/comment/decision', {decision: decision, id: id}, {
          headers: {
            'Authorization': `Bearer ${VueCookie.get('token')}`
          }
        })
          .then(response => {
            this.comments.map(comment => {
              if (comment.id === id) {
                return response.data
              }
            })
            this.$forceUpdate()
            SweetAlert.confirm(
              'Comment updated',
              'Comment was successfully updated'
            )
          })
      } else {
        // title text type confirmation url
        SweetAlert.delete(
          'Delete this comment?',
          'Are you sure you want to delete this comment?',
          'warning',
          'Comment successfully deleted',
          `/comment/delete/${id}`
        )
          .then(result => {
            $('#showModal').modal('toggle')
            if (result.value) {
              this.posts.splice(index, 1)
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  computed: {
    filteredComments () {
      if (this.filter === 'all') {
        return this.comments
      } else {
        return this.comments.filter(comment => this.filter === 'ok' ? comment.accepted : !comment.accepted)
      }
    }
  }
}
</script>
