<template>
  <div class="tags">
    <div class="form-inline col-md-8">
      <button class="btn btn-outline-primary mb-2" @click="handleAdd">
        <i class="fas fa-plus"></i>
        Add a new tag
      </button>
      <label class="sr-only" for="search">Name</label>
      <input type="text" class="form-control mb-2 mr-sm-2" id="search" v-model="search" placeholder="Search...">
    </div>
    <div class="col-sm-12 row" v-for="(tag, index) in filteredList" :key="index">
      <div class="col-sm-8">
        <h4>{{tag.name_en}} <small v-if="tag.name_en !== tag.name_fr">/ {{ tag.name_fr }}</small></h4>
        <p>{{tag.description_en}}</p>
      </div>
      <div class="col-sm-4 bulk">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <a class="btn btn-outline-light" @click="handleEdit(tag)">
            <i class="fas fa-wrench"></i>
          </a>
          <a class="btn btn-outline-light" @click="handleDelete(tag)">
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editModal" data-backdrop="false" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submit">
              <div class="form-group">
                <label for="name_en">Tag name</label>
                <input type="text" class="form-control" id="name_en" v-model="tag.name_en" placeholder="Tag name">
              </div>
              <div class="form-group">
                <label for="name_fr">French translation</label>
                <input type="text" class="form-control" id="name_fr" v-model="tag.name_fr" placeholder="French translation">
              </div>
              <div class="form-group">
                <label for="e_description_en">Description in english</label>
                <textarea class="form-control" placeholder="Description in english" id="e_description_en" rows="3" v-model="tag.description_en"></textarea>
              </div>
              <div class="form-group">
                <label for="e_description_fr">Description in french</label>
                <textarea class="form-control" placeholder="Description in french" id="e_description_fr" rows="3" v-model="tag.description_fr"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="submit(tag.id)">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addModal" data-backdrop="false" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add a new tag</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submit">
              <div class="form-group">
                <label for="name">Tag name</label>
                <input type="text" class="form-control" id="name" v-model="tag.name_en" placeholder="Tag name">
              </div>
              <div class="form-group">
                <label for="e_name_fr">French translation</label>
                <input type="text" class="form-control" id="e_name_fr" v-model="tag.name_fr" placeholder="French translation">
              </div>
              <div class="form-group">
                <label for="description_en">Description in english</label>
                <textarea class="form-control" placeholder="Description in english" id="description_en" rows="3" v-model="tag.description_en"></textarea>
              </div>
              <div class="form-group">
                <label for="description_fr">Description in french</label>
                <textarea class="form-control" placeholder="Description in french" id="description_fr" rows="3" v-model="tag.description_fr"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-outline-primary" @click="submit(null)">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SweetAlert from '../../settings/SweetAlert2'
import VueCookie from '../../settings/VueCookie'
export default {
  data () {
    return {
      tags: [],
      tag: {
        name_en: '',
        name_fr: '',
        description_en: '',
        description_fr: ''
      },
      search: ''
    }
  },

  mounted () {
    this.$axios.get('/tags')
      .then(response => {
        this.tags = response.data
      })
      .catch(e => console.log(e.response))
    this.$parent.setTitle('Tag management')
  },

  methods: {
    handleDelete (tag) {
      SweetAlert.delete(
        `Delete "${tag.name_en}"?`,
        `Are you sure you want to delete the tag "${tag.name_en}"?`,
        'warning',
        `"${tag.name_en}" has been successfully deleted`,
        `/tag/${tag.id}`
      )
    },

    handleAdd () {
      $('#addModal').modal()
    },

    handleEdit (tag) {
      this.tag = tag
      $('#editModal h5').text(`Edit "${tag.name_en}"`)
      $('#editModal ')
      $('#editModal').modal()
    },

    submit (id = null) {
      if (!Number.isInteger(id)) {
        this.$axios.post('/tag', this.tag, {
          headers: {
            'Authorization': `Bearer ${VueCookie.get('token')}`
          }
        })
          .then(response => {
            SweetAlert.confirm('Tag successfully created', `Tag "${response.data.name_en}" was created`)
            $('#addModal').find('input[type=text], textarea').val('').modal('toggle')
            this.tags.push(response.data)
          })
          .catch(e => console.log(e))
      } else {
        this.$axios.put(`tag/${id}`, this.tag, {
          headers: {
            'Authorization': `Bearer ${VueCookie.get('token')}`
          }
        })
          .then(response => {
            SweetAlert.confirm('Tag was updated!', `Tag "${response.data.name_en}" sucessfully updated!`)
            $('#editModal form').find('input[type=text], textarea').val('')
            $('#editModal').modal('toggle')
            this.tags.map(tag => {
              if (tag.id === id) {
                return response.data
              }
            })
          })
      }
    }
  },
  computed: {
    filteredList () {
      return this.tags.filter(tag => {
        return tag.name_en.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<!-- title, text, type, confirmation, url -->
