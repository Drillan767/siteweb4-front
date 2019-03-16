<template>
  <div class="messages">
    <table class="table table-borderless table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Object</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(message, index) in messages" :class="!message.read && 'unread'" :key="index" @click="showMessage(message)">
          <td>{{ message.name }}</td>
          <td>{{ message.email }}</td>
          <td>{{ message.object }}</td>
          <td>{{ toDate(message.created_at) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="show_message" data-backdrop="false" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body row">
            <div class="col-md-6">
              <p>{{ message.name }}</p>
            </div>
            <div class="col-md-6">
              <p>{{ message.email }}</p>
            </div>
            <div class="col-md-12">
              <p>Subject: {{ message.object }}</p>
            </div>
            <div class="col-md-12">
              <p>{{ message.message }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
            <button @click.prevent="showResponse(message)"  type="button" class="btn btn-outline-primary">Respond</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="show_response" data-backdrop="false" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Response</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body row">
            <form @submit.prevent="sendResponse"></form>
            <div class="form-group col-md-6">
              <label>Recipient</label>
              <input type="text" class="form-control" v-model="response.email">
            </div>
            <div class="col-md-6 form-group">
              <label>Subject</label>
              <input type="text" class="form-control" v-model="response.subject" disabled>
            </div>
            <div class="col-md-12">
              <textarea class="form-control" v-model="response.message"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
            <button @click.prevent="showResponse(message)"  type="button" class="btn btn-outline-primary">Respond</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'
import VueCookie from '../../settings/VueCookie'
export default {
  data () {
    return {
      messages: [],
      message: {
        name: '',
        email: '',
        object: '',
        message: '',
        read: false
      },
      response: {
        email: '',
        subject: '',
        message: ''
      }
    }
  },

  mounted () {
    this.$parent.setTitle('Messages')
    this.$axios.get('/messages', {
      headers: {
        'Authorization': `Bearer ${ VueCookie.get('token') }`
      }
    })
      .then(response => {
        this.messages = response.data
      })
      .catch(e => {
        console.log(e.response)
      })
  },

  methods: {
    toDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },

    showMessage (message) {
      this.message = message
      $('#show_message').modal()
      if (!message.read) {
        this.$axios.post('/message/read', { id: message.id }, {
          headers: {
            'Authorization': `Bearer ${ VueCookie.get('token') }`
          }
        })
          .then(response => {
            console.log(response)
            this.messages.map((message, index) => {
              if (message.id === response.data.id) {
                return response.data
              }
            })
            this.message = response.data
            $('#show_message').modal()
          })
          .catch(e => {
            console.log(e.response)
          })
      }
    },

    showResponse (message) {
      this.response.email = this.message.email
      this.response.subject = 'Re: ' + this.message.object
      $('#show_message').modal('hide')
      $('#show_response').modal()
    },

    sendResponse () {
      // ...
    }
  }
}
</script>
