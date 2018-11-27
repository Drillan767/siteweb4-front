<template>
  <div class="row">
    <div class="col-md-8 mx-auto edit-settings">
      <div class="alert alert-danger" v-if="errors" role="alert">
        <span>Please fix the following problems:</span>
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error.message }}
          </li>
        </ul>
      </div>
      <form @submit.prevent="submit">
        <div class="form-group row">

          <div class="col-sm-12 row sm" v-for="(sm, index) in social_medias" :key="index">
            <div class="form-group col-sm-5">
              <vue-multiselect
                :options="icons"
                :close-on-select="true"
                v-model="sm.icon"
                :group-select="true"
                group-label="category"
                group-values="icons"
                track-by="name"
                label="name"
              >
                <template
                  slot="singleLabel"
                  slot-scope="props"
                >
                  <span>
                    <i :class="props.option.name"></i>
                    {{ cleaned(props.option.name) }}
                  </span>
                </template>
                <template
                  slot="option"
                  slot-scope="props"
                >
                  <span v-if="props.option.$isLabel">
                    {{ props.option.$groupLabel }}
                  </span>
                  <span :class="props.option.class" v-else>
                    <i :class="props.option.name"></i>
                    {{ list(props.option.name) }}
                  </span>
                </template>
              </vue-multiselect>
            </div>
            <div class="form-group col-sm-5">
              <input type="text" class="form-control" placeholder="Social media's url" v-model="sm.url">
            </div>
            <div class="col-sm-2 delete-row">
              <button class="btn btn-outline-danger" @click.prevent="removeRow(index)">
                <i class="fas fa-times"></i> Remove
              </button>
            </div>
          </div>

          <div class="col-md-12">
            <button class="btn btn-outline-secondary" @click.prevent="addRow">
              <i class="fas fa-plus"></i> Add a row
            </button>
          </div>

          <div class="form-group col-sm-6">
            <label for="website_name">Website's name</label><br />
            <input type="text" id="website_name" class="form-control" placeholder="Website's name" v-model="settings.website_name">
          </div>

          <div class="form-group col-sm-6">
            <label for="settings_dark">Set website in <b>{{ settings.dark_mode ? 'dark' : 'light'}}</b> mode</label><br />
            <label class="switch">
              <input type="checkbox" id="settings_dark" v-model="settings.dark_mode">
              <span class="slider round"></span>
            </label>
          </div>
          <button class="btn btn-outline-primary">Save changes</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import VueCookie from '../../settings/VueCookie'
import FA from '../../assets/fa'
import VueMultiselect from 'vue-multiselect/src/Multiselect'
export default {
  components: { VueMultiselect },
  data () {
    return {
      settings: {
        social_medias: '',
        website_name: '',
        dark_mode: true
      },
      errors: null,
      social_medias: [],
      icons: null
    }
  },

  methods: {
    addRow () {
      this.social_medias.push({icon: '', url: ''})
    },

    removeRow (index) {
      this.social_medias.splice(index, 1)
    },

    list (fa) {
      fa = fa.replace(/(fas|far|fab) fa-/gm, '')
      fa = fa.replace(/-/gm, ' ')
      fa = fa.split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
      return fa
    },

    cleaned (fa) {
      fa = fa.replace(/(fas|far|fab) fa-/gm, '')
      fa = fa.replace(/-/gm, ' ')
      fa = fa.split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
      return fa
    },

    submit () {
      let formData = new FormData()
      formData.append('social_medias', JSON.stringify(this.social_medias))
      formData.append('website_name', this.settings.website_name)
      formData.append('dark_mode', this.settings.dark_mode ? 1 : 0)

      this.$axios.post('/settings', formData, {
        headers: {
          'Authorization': `Bearer ${VueCookie.get('token')}`
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log(e.response)
        })
    }
  },

  mounted () {
    this.$axios.get('/admin_settings', {
      headers: {
        'Authorization': `Bearer ${VueCookie.get('token')}`
      }
    })
      .then(response => {
        this.settings = response.data
        this.social_medias = JSON.parse(this.settings.social_medias)
      })
      .catch(e => {
        console.log(e.response)
      })
    this.$parent.setTitle('Global settings')
    this.icons = FA
  }
}
</script>
